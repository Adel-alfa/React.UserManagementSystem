using Management.Api.Domain.TypeSafe;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Management.Api.Infrastructure.Security
{
    public class JwtOptionsSetup : IConfigureOptions<JwtOptions>
    {
        private const string appsettingsSectionNane = "Jwt";
        private readonly IConfiguration _configuration;
        public JwtOptionsSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void Configure(JwtOptions options)
        {
            _configuration.GetSection(appsettingsSectionNane).Bind(options);
        }
    }
}
