using System.Reflection;
using BandClickBackend.Application.Dtos.Auth;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Application.Services;
using BandClickBackend.Application.Validators.Auth;
using BandClickBackend.Application.Validators.User;
using BandClickBackend.Domain.Entities;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace BandClickBackend.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddFluentValidation();
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddHttpContextAccessor();

            services.AddScoped<IValidator<RegisterUserDto>, RegisterUserValidator>();
            services.AddScoped<IValidator<LoginDto>, LoginValidator>();

            services.AddScoped<IUserContextService, UserContextService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IMetronomeSettingsService, MetronomeSettingsService>();
            services.AddScoped<IMetreService, MetreService>();
            services.AddScoped<IPlaylistService, PlaylistService>();

            return services;
        }
    }
}
