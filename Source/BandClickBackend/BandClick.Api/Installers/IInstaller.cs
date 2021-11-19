using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BandClickBackend.Api.Installers
{
    public interface IInstaller
    {
        void InstallServices(IServiceCollection services, IConfiguration Configuration);
    }
}
