using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Management.Api.Domain.Entities
{
    public class ApplicationUser:IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public DateTime CreationDate { get; private set; }= DateTime.UtcNow;
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
        [NotMapped]
        public IList<string> Roles { get; set; } = new List<string>();
    }
}
