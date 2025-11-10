using Management.Api.Domain.Interfaces;
using Management.Api.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;

namespace Management.Api.Infrastructure.Configurations
{
    public static class ServicesRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<ILogService, LogService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    } 
}
