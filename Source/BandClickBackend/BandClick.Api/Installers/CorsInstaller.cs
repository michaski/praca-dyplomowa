using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BandClickBackend.Api.Installers
{
    public class CorsInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration Configuration)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("BandClickCorsPolicy", builder => 
                    builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins(new [] {
                            Configuration["AllowedOrigins:0"],
                            Configuration["AllowedOrigins:1"],
                            Configuration["AllowedOrigins:2"]
                        })
                    );
            });
        }
    }
}
