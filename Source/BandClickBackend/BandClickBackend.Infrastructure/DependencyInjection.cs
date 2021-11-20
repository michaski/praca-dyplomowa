using BandClickBackend.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;

namespace BandClickBackend.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<DbSeeder>();
            return services;
        }
    }
}
