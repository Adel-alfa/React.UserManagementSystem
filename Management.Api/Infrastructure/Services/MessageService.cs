using Management.Api.Application.DTOs.Message;
using Management.Api.Application.Responses;
using Management.Api.Domain.Entities;
using Management.Api.Domain.Interfaces;
using Management.Api.Infrastructure.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Management.Api.Infrastructure.Services
{
    public class MessageService : IMessageService
    {
        private readonly AppDbContext _context;
        private readonly ILogService _logService;
        private readonly UserManager<ApplicationUser> _userManager;
        public MessageService(AppDbContext context, ILogService logService
            , UserManager<ApplicationUser> userManager)
        {                
            _context = context;
            _logService = logService;
            _userManager = userManager;
        }
        public async Task<Response<bool>> CreateMessageAsync(ClaimsPrincipal user, CreateMessageDto createMessageDto)
        {
            if(user == null || createMessageDto == null)
            {
                return  Response<bool>.Fail("Invalid input") ;
            }
            if (user.Identity.Name ==  createMessageDto.Recipient)
            {
                return Response<bool>.Fail("Sender can not be the Recipient!");
            }
            var isReceipientExist = _userManager.Users.Any(u => u.UserName == createMessageDto.Recipient);
            if (!isReceipientExist)
            {
                return Response<bool>.Fail("Recipient does not exist");
            }
            var message = new Message
            {
                Id = Guid.CreateVersion7(),
                Sender = user.Identity.Name,
                Recipient = createMessageDto.Recipient,
                Subject = createMessageDto.Subject,
                Body = createMessageDto.Body
            };
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
            await _logService.SaveLogAsync(user.Identity.Name, $"Message sent from {message.Sender} to {message.Recipient}");
            return Response<bool>.Ok(true,"Message saved successfully");
        }

        public async Task<Response<IEnumerable<GetMessageDto>>> GetMessagesAsync()
        {
            var messages = await _context.Messages.Select(m => new GetMessageDto
            {
                Id = m.Id.ToString(),
                Sender = m.Sender,
                Recipient = m.Recipient,
                Subject = m.Subject,
                Body = m.Body,
                SentDate = m.SentDate
            })
                .OrderByDescending(m => m.SentDate)
                .ToListAsync();
            return Response<IEnumerable<GetMessageDto>>.Ok(messages);
        }

        public async Task<Response<IEnumerable<GetMessageDto>>> GetUserMessagesAsync(ClaimsPrincipal user)
        {
            var messages = await _context.Messages
                .Where(m => m.Recipient == user.Identity.Name || m.Sender == user.Identity.Name)
                .Select(m => new GetMessageDto
                {
                    Id = m.Id.ToString(),
                    Sender = m.Sender,
                    Recipient = m.Recipient,
                    Subject = m.Subject,
                    Body = m.Body,
                    SentDate = m.SentDate
                })
                .OrderByDescending(m => m.SentDate)
                .ToListAsync();
            return Response<IEnumerable<GetMessageDto>>.Ok(messages);
        }
    }
}
