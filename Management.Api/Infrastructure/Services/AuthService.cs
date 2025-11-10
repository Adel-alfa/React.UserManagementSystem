using Management.Api.Application.DTOs.Auth;
using Management.Api.Application.Responses;
using Management.Api.Domain.Entities;
using Management.Api.Domain.Interfaces;
using Management.Api.Domain.TypeSafe;
using Management.Api.Infrastructure.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Management.Api.Infrastructure.Services
{
    public class AuthService : IAuthService
    {

        private readonly AppDbContext _context;
        private readonly ILogService _logService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JwtOptions _jwtSettings;
        public AuthService(AppDbContext context, ILogService logService
            , UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager,
            IOptions<JwtOptions> jwtSettings)
        {
            _context = context;
            _logService = logService;
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtSettings= jwtSettings.Value;
        }
        public async Task<Response<bool>> SeedRolesAsync()
        {
            bool isOwnerRoleExists = await _roleManager.RoleExistsAsync(StaticRoles.Owner);
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticRoles.Admin);
            bool isManagerRoleExists = await _roleManager.RoleExistsAsync(StaticRoles.Manager);
            bool isUserRoleExists = await _roleManager.RoleExistsAsync(StaticRoles.User);
            if (isOwnerRoleExists && isAdminRoleExists && isManagerRoleExists && isUserRoleExists) 
            {
                return Response<bool>.Fail("Roles are already exist!");
            }
            await _roleManager.CreateAsync(new IdentityRole(StaticRoles.Owner));
            await _roleManager.CreateAsync(new IdentityRole(StaticRoles.Admin));
            await _roleManager.CreateAsync(new IdentityRole(StaticRoles.Manager));
            await _roleManager.CreateAsync(new IdentityRole(StaticRoles.User));
            return Response<bool>.Ok(true, "Roles seeding well done!");

        }
        public async Task<Response<bool>> RegisterAsync(RegisterDto registerDto)
        {
            var isExistUser = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isExistUser is not null)
            {
                return Response<bool>.Fail("UserName is already exist!");
            }
            ApplicationUser newUser = new()
            {
                UserName = registerDto.UserName,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Address = registerDto.Address,
                SecurityStamp = Guid.CreateVersion7().ToString(),
            };
            var createUserResult = await _userManager.CreateAsync(newUser,registerDto.Password);
            if(!createUserResult.Succeeded)
            {
                var ResulErrors = new List<string>();
                foreach (var error in createUserResult.Errors)
                {
                    ResulErrors.Add(error.Description);
                }
                return Response<bool>.Fail("User Creation failed!", ResulErrors);
            }
            await _userManager.AddToRoleAsync(newUser, StaticRoles.User);

            await _logService.SaveLogAsync(newUser.UserName, $"New user registered with UserName: {newUser.UserName}");
            return Response<bool>.Ok(true, "User created successfully!");
        }
        public async Task<Response<LoginServiceResponseDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user is null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Response<LoginServiceResponseDto>.Fail("Invalid UserName or Password!");
            }

            var token = await GenerateJWTTokenString(user);

            var roles = await _userManager.GetRolesAsync(user);
            var userDetails = new UserDetails
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,   
                CreationDate = user.CreationDate,
                Roles = roles,
            };  
            await _logService.SaveLogAsync(user.UserName, $"User logged in with UserName: {user.UserName}");
            var responseDto = new LoginServiceResponseDto
            {
                NewToken = token,
                UserDetails = userDetails,
            };
            return Response<LoginServiceResponseDto>.Ok(responseDto, "Login successful!");
        }
        public async Task<Response<bool>> UpdateRoleAsync(ClaimsPrincipal user, RoleAssignDto roleAssignDto)
        {
            var Userdb = await _userManager.FindByNameAsync(roleAssignDto.UserName);
            if (Userdb is null)
            {
                return Response<bool>.Fail("User not found!");
            }
           
            var userRoles = await _userManager.GetRolesAsync(Userdb);
           
            if (user.IsInRole(StaticRoles.Admin))
            {
                if(roleAssignDto.NewRole == RoleType.User || roleAssignDto.NewRole == RoleType.Manager)
                {
                    if(userRoles.Any(r=> r.Equals(StaticRoles.Owner) || r.Equals(StaticRoles.Admin)))
                    {
                        return Response<bool>.Fail("You do not have the permission to change the role of this user");
                    }
                    else
                    {
                        var removeResult = await _userManager.RemoveFromRolesAsync(Userdb, userRoles);
                        var addRoleResult = await _userManager.AddToRoleAsync(Userdb, roleAssignDto.NewRole.ToString());
                        if (!addRoleResult.Succeeded || !removeResult.Succeeded)
                        {
                            var ResulErrors = new List<string>();
                            foreach (var error in addRoleResult.Errors)
                            {
                                ResulErrors.Add(error.Description);
                            }
                            foreach (var error in removeResult.Errors)
                            {
                                ResulErrors.Add(error.Description);
                            }
                            return Response<bool>.Fail("Role update failed!", ResulErrors);
                        }
                        await _logService.SaveLogAsync(user.Identity.Name, $"Updated role of UserName: {Userdb.UserName} to Role: {roleAssignDto.NewRole}");
                        return Response<bool>.Ok(true, "User role updated successfully!");
                    }
                }
                else
                {
                    return Response<bool>.Fail("Admins can only assign User or Manager roles!");

                }

            }
            else
            {
                // Only Owners can assign Admin roles
                if (userRoles.Any(r => r.Equals(StaticRoles.Owner)))
                {
                    return Response<bool>.Fail("You do not have the permission to change the role of this user");
                }
                else
                {
                    var removeResult = await _userManager.RemoveFromRolesAsync(Userdb, userRoles);
                    var addRoleResult = await _userManager.AddToRoleAsync(Userdb, roleAssignDto.NewRole.ToString());
                    if (!addRoleResult.Succeeded || !removeResult.Succeeded)
                    {
                        var ResulErrors = new List<string>();
                        foreach (var error in addRoleResult.Errors)
                        {
                            ResulErrors.Add(error.Description);
                        }
                        foreach (var error in removeResult.Errors)
                        {
                            ResulErrors.Add(error.Description);
                        }
                        return Response<bool>.Fail("Role update failed!", ResulErrors);
                    }
                    await _logService.SaveLogAsync(user.Identity.Name, $"Updated role of UserName: {Userdb.UserName} to Role: {roleAssignDto.NewRole}");
                    return Response<bool>.Ok(true, "User role updated successfully!");
                }
            }
        }
        public async Task<Response<LoginServiceResponseDto>?> MeAsync(TokenDto tokenDto)
        {
            ClaimsPrincipal handler = new JwtSecurityTokenHandler().ValidateToken(tokenDto.Token, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = _jwtSettings.Issuer,
                ValidAudience = _jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key))

            }, out SecurityToken validatedToken);

            string decodedNameIdentifier = handler.Claims.First(c=>c.Type == ClaimTypes.NameIdentifier).Value;
            if(string.IsNullOrEmpty(decodedNameIdentifier))
            {
                return null;
            }
            var user = await _userManager.FindByIdAsync(decodedNameIdentifier);
            if(user is null)
            {
                return null;
            }
            var newToken = await GenerateJWTTokenString(user);

            var roles = await _userManager.GetRolesAsync(user);
            var userDetails = new UserDetails
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CreationDate = user.CreationDate,
                Roles = roles,
            };
            await _logService.SaveLogAsync(user.UserName, "New Token Generated");

            var responseDto = new LoginServiceResponseDto
            {
                NewToken = newToken,
                UserDetails = userDetails,
            };
            return Response<LoginServiceResponseDto>.Ok(responseDto, "New Token Generated Successful!");
        }
        public async Task<Response<IEnumerable<UserDetails>>> GetUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDetailsList = new List<UserDetails>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDetails = new UserDetails
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    CreationDate = user.CreationDate,
                    Roles = roles,
                };
                userDetailsList.Add(userDetails);
            }
            return Response<IEnumerable<UserDetails>>.Ok(userDetailsList, "Users retrieved successfully!");
        }
        public async Task<Response<UserDetails>?> GetUserByUserNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            if(user is null)
            {
                return null;
            }
            var roles = await _userManager.GetRolesAsync(user);
            var userDetails = new UserDetails
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                CreationDate = user.CreationDate,
                Roles = roles,
            };
            return Response<UserDetails>.Ok(userDetails, "User retrieved successfully!");
        }
        public async Task<Response<IEnumerable<string>>> GetUsersNameAsync()
        {
            var users = await _userManager.Users.Select(u=>u.UserName).ToListAsync();
            return Response<IEnumerable<string>>.Ok(users, "UserNames retrieved successfully!");
        }

       
        public Task ForgotPassword(ForgotPasswordRequest model, string origin)
        {
            throw new NotImplementedException();
        }
       
       
        public Task<Response<string>> ResetPassword(ResetPasswordRequest model)
        {
            throw new NotImplementedException();
        }       
       
        public async Task<string> GenerateJWTTokenString(ApplicationUser user)
        {
            //var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();

            foreach (var userRole in roles)
            {
                roleClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            var claims = new[]
          {
                 new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                

            }            
           .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            return tokenString;
        }
       
    }
}
