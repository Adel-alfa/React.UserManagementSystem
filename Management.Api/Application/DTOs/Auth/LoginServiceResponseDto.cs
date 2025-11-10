namespace Management.Api.Application.DTOs.Auth
{
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; } = string.Empty;
        public UserDetails UserDetails { get; set; }
    }

}
