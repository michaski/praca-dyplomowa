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

            services.AddScoped<IAccentedBeatsRepository, AccentedBeatsRepository>();
            services.AddScoped<IBandRepository, BandRepository>();
            services.AddScoped<IBandRoleRepository, BandRoleRepository>();
            services.AddScoped<IMetreRepository, MetreRepository>();
            services.AddScoped<IMetronomeSettingsInPlaylistRepository, MetronomeSettingsInPlaylistRepository>();
            services.AddScoped<IMetronomeSettingsRepository, MetronomeSettingsRepository>();
            services.AddScoped<IMetronomeSettingsTypeRepository, MetronomeSettingsTypeRepository>();
            services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            services.AddScoped<IPlaylistSharedInBandRepository, PlaylistSharedInBandRepository>();
            services.AddScoped<IRhythmicUnitRepository, RhythmicUnitRepository>();
            services.AddScoped<ISystemRoleRepository, SystemRoleRepository>();
            services.AddScoped<IUserInBandsRepository, UserInBandsRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
