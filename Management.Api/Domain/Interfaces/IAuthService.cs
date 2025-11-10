using Management.Api.Application.DTOs.Auth;
using Management.Api.Application.Responses;
using Management.Api.Infrastructure.Services;
using Microsoft.AspNetCore.Identity.Data;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Management.Api.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<Response<bool>> SeedRolesAsync();
        Task<Response<bool>> RegisterAsync(RegisterDto registerDto);
        Task<Response<LoginServiceResponseDto>> LoginAsync(LoginDto loginDto);
        Task<Response<bool>> UpdateRoleAsync(ClaimsPrincipal user, RoleAssignDto roleAssignDto);
        Task<Response<LoginServiceResponseDto>?> MeAsync(TokenDto tokenDto);
        Task<Response<IEnumerable<UserDetails>>> GetUsersAsync();
        Task<Response<UserDetails>?> GetUserByUserNameAsync(string userName);
        Task<Response<IEnumerable<string>>> GetUsersNameAsync();
        Task ForgotPassword(ForgotPasswordRequest model, string origin);
        Task<Response<string>> ResetPassword(ResetPasswordRequest model);
        

    }
}
