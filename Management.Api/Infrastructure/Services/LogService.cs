using Management.Api.Application.DTOs.Log;
using Management.Api.Application.Responses;
using Management.Api.Domain.Entities;
using Management.Api.Domain.Interfaces;
using Management.Api.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;

namespace Management.Api.Infrastructure.Services
{
    public class LogService(AppDbContext context): ILogService
    {
        public async Task SaveLogAsync(string userName, string description)
        {
            var log = new Log()
            {
                UserName = userName,
                Description = description,   
                
            };
            log.Id = Guid.CreateVersion7();
            try
            {
                await context.Logs.AddAsync(log);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
            }
            
        }
        public async Task<Response<IEnumerable<GetLogDto>>> GetLogsAsync()
        {
            var logs = await context.Logs
                .Select(log => new GetLogDto
                {
                    CreationDate = log.CreationDate,
                    UserName = log.UserName,
                    Description = log.Description
                })
                .OrderByDescending(log => log.CreationDate)
                .ToListAsync();
            
            return Response<IEnumerable<GetLogDto>>.Ok(logs); 
        }

        public async Task<Response<IEnumerable<GetLogDto>>> GetUserLogsAsync(ClaimsPrincipal user)
        {
            var logs = await context.Logs
                .Where(log => log.UserName == user.Identity.Name)
                .Select(log => new GetLogDto
                {
                    CreationDate = log.CreationDate,
                    UserName = log.UserName,
                    Description = log.Description
                })
                .OrderByDescending(log => log.CreationDate)
                .ToListAsync()!;
            return Response<IEnumerable<GetLogDto>>.Ok(logs);
        }

        
    }
}
