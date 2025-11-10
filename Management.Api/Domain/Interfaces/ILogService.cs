using Management.Api.Application.DTOs.Log;
using Management.Api.Application.Responses;
using System.Security.Claims;

namespace Management.Api.Domain.Interfaces
{
    public interface ILogService
    {
        Task SaveLogAsync( string userName, string description);
        Task<Response<IEnumerable<GetLogDto>>> GetLogsAsync();
        Task<Response<IEnumerable<GetLogDto>>> GetUserLogsAsync( ClaimsPrincipal user);
    }
}
