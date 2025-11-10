using Management.Api.Domain.TypeSafe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Management.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        
        [HttpGet("Public")]        
        public IActionResult GetPublic() => Ok("Ok");
       
        [Authorize(Roles = StaticRoles.User)]
        [HttpGet("get-user-role")]
        public IActionResult GetUser() => Ok("Ok User");
       
        [Authorize(Roles = StaticRoles.Admin)]
        [HttpGet("get-admin-role")]
        public IActionResult GetAdmin() => Ok("Ok Admin");
        
        [Authorize(Roles = StaticRoles.Manager)]
        [HttpGet("get-manager-role")]
        public IActionResult GetManager() => Ok("Ok Manageer");
        
        [Authorize (Roles =StaticRoles.Owner)]
        [HttpGet("get-Owner-role")]
        public IActionResult GetOwner() => Ok("Ok Owner");
    }
}
