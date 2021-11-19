using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BandClickBackend.Api.Installers
{
    public class DbInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<BandClickDbContext>(opt =>
                opt.UseNpgsql(Configuration.GetConnectionString("BandClickConnectionString")));
        }
    }
}
