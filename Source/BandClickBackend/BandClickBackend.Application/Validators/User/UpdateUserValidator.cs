using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Exceptions;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.User
{
    public class UpdateUserValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator(IUserRepository userRepository, ISystemRoleRepository systemRoleRepository, IUserContextService userContextService)
        {
            Guid userId = Guid.Empty;
            RuleFor(dto => dto.Id)
                .NotEmpty()
                .MustAsync(async (id, token) =>
                    await userRepository.GetUserByIdAsync(id) is not null)
                .WithMessage("Nie znaleziono użytkownika o podanym identyfikatorze.")
                .CustomAsync(async (id, context, token) =>
                {
                    userId = id;
                    var user = await userRepository.GetUserByIdAsync(id);
                    if (userId != userContextService.UserId || 
                        user.SystemRole != systemRoleRepository.Admin)
                    {
                        throw new UserNotAllowedException("Brak uprawnień.");
                    }
                });
            RuleFor(dto => dto.Username)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(64)
                .CustomAsync(async (username, context, token) =>
                {
                    var entity = await userRepository.GetUserByUsernameAsync(username);
                    if (entity is not null)
                    {
                        if (entity.Id != userId)
                        {
                            context.AddFailure("Błąd w nazwie użytkownika lub id.");
                        }
                    }
                    else
                    {
                        context.AddFailure("Nie znaleziono użytkownika o podanej nazwie.");
                    }
                });
            RuleFor(dto => dto.Email)
                .NotEmpty()
                .EmailAddress()
                .MinimumLength(5)
                .MaximumLength(64)
                .MustAsync(async (email, token) =>
                    await userRepository.GetUserByEmailAsync(email) is not null)
                .WithMessage("Nie znaleziono użytkownika o podanym adresie email.");
        }
    }
}
