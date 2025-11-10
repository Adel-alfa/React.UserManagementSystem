using Management.Api.Application.DTOs.Auth;
using Management.Api.Domain.Interfaces;
using Management.Api.Domain.TypeSafe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Management.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost]
        [Route("seed-roles")]        
        public async Task<IActionResult> seedRools()
        {
            var result = _authService.SeedRolesAsync();
            return Ok(result);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result.Message);
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result.Data);
        }
        [HttpPost]
        [Route("assign-role")]
        [Authorize(Roles = StaticRoles.OwnerAdmin)]
        public async Task<IActionResult> AssignRole([FromBody] RoleAssignDto roleAssignDto)
        {
            var result = await _authService.UpdateRoleAsync(User, roleAssignDto);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result.Message);
        }
        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody] TokenDto tokenDto)
        {
            try
            {
                var result = await _authService.MeAsync(tokenDto);
                if (!result.Success)
                {
                    return Unauthorized(result.Message);
                }
                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return Unauthorized("invalid Token");
                 
            }
        }
        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<IEnumerable<UserDetails>>> GetUsersAsync()
        {
            var result = await _authService.GetUsersAsync();
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }
            return Ok(result.Data);
        }
        [HttpGet]
        [Route("users/{userName}")]
        public async Task<ActionResult<UserDetails>> GetUserByUserNameAsync(string userName)
        {
            var result = await _authService.GetUserByUserNameAsync(userName);
            if (result is not null)
            {
                return Ok(result.Data);
            }
            return NotFound( "User not found!");
        }
        [HttpGet]
        [Route("usersNames")]
        public async Task<ActionResult<IEnumerable<string>>> GetUsersNameAsync()
        {
            var result = await _authService.GetUsersNameAsync();           
            return Ok(result.Data);
        }
       
    }

}
