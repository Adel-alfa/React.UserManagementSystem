using Management.Api.Application.DTOs.Message;
using Management.Api.Domain.Interfaces;
using Management.Api.Domain.TypeSafe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Management.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;
        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }
        [HttpPost]
        [Route("create")]
        [Authorize]
        public async Task<IActionResult> CreateMessages([FromBody] CreateMessageDto createMessageDto)
        {
            var result = await _messageService.CreateMessageAsync(User, createMessageDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result.Message);
        }
        [HttpGet]
        [Route("mine")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMyMessages()
        {
            var result = await _messageService.GetUserMessagesAsync(User);           
            return Ok(result.Data);
        }
        [HttpGet]       
        [Authorize(Roles = StaticRoles.OwnerAdmin)]
        public async Task<ActionResult<IEnumerable<GetMessageDto>>> GetMessages()
        {
            var messages = await _messageService.GetMessagesAsync();
            
            return Ok(messages.Data);
        }
    }
}
