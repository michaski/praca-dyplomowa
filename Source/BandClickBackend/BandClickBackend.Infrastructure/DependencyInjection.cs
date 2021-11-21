using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using BandClickBackend.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace BandClickBackend.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<DbSeeder>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ISystemRoleRepository, SystemRoleRepository>();

            return services;
        }
    }
}
