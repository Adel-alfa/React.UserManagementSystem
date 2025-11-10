using System.ComponentModel.DataAnnotations;

namespace Management.Api.Application.DTOs.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage ="UserName is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "UserName must be between 3 and 50 characters")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Password is required"), DataType(DataType.Password)]       
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string? Password { get; set; }
    }
}
