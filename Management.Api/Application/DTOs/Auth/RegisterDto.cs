using System.ComponentModel.DataAnnotations;

namespace Management.Api.Application.DTOs.Auth
{
    public class RegisterDto
    {
        [Required, MaxLength(25)]
        public string FirstName { get; set; }
        [Required, MaxLength(25)]
        public string LastName { get; set; }
        [Required (ErrorMessage ="UserName is required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Email is required"), EmailAddress, DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public string Address { get; set; }

        [Required(ErrorMessage = "Password is required"),MinLength(6), MaxLength(50), DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
