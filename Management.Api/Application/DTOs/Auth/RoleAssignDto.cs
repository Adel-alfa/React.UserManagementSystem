using Management.Api.Domain.TypeSafe;

namespace Management.Api.Application.DTOs.Auth
{
    public class RoleAssignDto
    {
        public string UserName { get; set; } 
        public RoleType NewRole { get; set; } 
    }
}
