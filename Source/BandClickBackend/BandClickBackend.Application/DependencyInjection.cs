using System.Reflection;
using BandClickBackend.Application.Dtos.Auth;
using BandClickBackend.Application.Dtos.Band;
using BandClickBackend.Application.Dtos.Filters;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Application.Dtos.Playlist;
using BandClickBackend.Application.Dtos.PlaylistComment;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Dtos.UserInBands;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Application.Middleware;
using BandClickBackend.Application.Services;
using BandClickBackend.Application.Validators.Auth;
using BandClickBackend.Application.Validators.Band;
using BandClickBackend.Application.Validators.Filters;
using BandClickBackend.Application.Validators.Metre;
using BandClickBackend.Application.Validators.MetronomeSettings;
using BandClickBackend.Application.Validators.MetronomeSettingsComment;
using BandClickBackend.Application.Validators.Playlist;
using BandClickBackend.Application.Validators.PlaylistComment;
using BandClickBackend.Application.Validators.User;
using BandClickBackend.Application.Validators.UserInBands;
using BandClickBackend.Domain.Common;
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
            services.AddScoped<ErrorHandlingMiddleware>();

            services.AddScoped<IValidator<LoginDto>, LoginValidator>();
            services.AddScoped<IValidator<UpdateBandDto>, UpdateBandValidator>();
            services.AddScoped<IValidator<QueryFilters>, QueryFiltersValidator>();
            services.AddScoped<IValidator<MetreViewDto>, MetreViewValidator>();
            services.AddScoped<IValidator<UpdateMetreDto>, UpdateMetreValidator>();
            services.AddScoped<IValidator<AddMetronomeSettingsDto>, AddMetronomeSettingValidator>();
            services.AddScoped<IValidator<UpdateMetronomeSettingDto>, UpdateMetronomeSettingsValidator>();
            services.AddScoped<IValidator<AddMetronomeSettingsCommentDto>, AddSettingCommentValidator>();
            services.AddScoped<IValidator<UpdateMetronomeSettingsCommentDto>, UpdateSettingCommentValidator>();
            services.AddScoped<IValidator<CreatePlaylistDto>, CreatePlaylistValidator>();
            services.AddScoped<IValidator<EditPlaylistDto>, EditPlaylistValidator>();
            services.AddScoped<IValidator<AddPlaylistCommentDto>, AddPlaylistCommentValidator>();
            services.AddScoped<IValidator<UpdatePlaylistCommentDto>, UpdatePlaylistCommentValidator>();
            services.AddScoped<IValidator<ChangeUserPasswordDto>, ChangeUserPasswordValidator>();
            services.AddScoped<IValidator<RegisterUserDto>, RegisterUserValidator>();
            services.AddScoped<IValidator<UpdateUserDto>, UpdateUserValidator>();
            services.AddScoped<IValidator<UserBandRelationDto>, UserBandRelationValidator>();

            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IBandService, BandService>();
            services.AddScoped<IMetreService, MetreService>();
            services.AddScoped<IMetronomeSettingsInPlaylistService, MetronomeSettingsInPlaylistService>();
            services.AddScoped<IMetronomeSettingsService, MetronomeSettingsService>();
            services.AddScoped<IMetronomeSoundService, MetronomeSoundService>();
            services.AddScoped<IPlaylistService, PlaylistService>();
            services.AddScoped<IUserContextService, UserContextService>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
