using Management.Api.Application.DTOs.Auth;
using Management.Api.Application.DTOs.Log;
using Management.Api.Application.DTOs.Message;
using Management.Api.Application.Responses;
using System.Security.Claims;

namespace Management.Api.Domain.Interfaces
{
    public interface IMessageService
    {
        Task<Response<bool>> CreateMessageAsync(ClaimsPrincipal user, CreateMessageDto createMessageDto);
        Task<Response<IEnumerable<GetMessageDto>>> GetMessagesAsync();
        Task<Response<IEnumerable<GetMessageDto>>> GetUserMessagesAsync(ClaimsPrincipal user);
    }
}
