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
    public class ChangeUserPasswordValidator : AbstractValidator<ChangeUserPasswordDto>
    {
        public ChangeUserPasswordValidator(IUserRepository userRepository, ISystemRoleRepository systemRoleRepository, IUserContextService userContextService)
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
                    if (userId != userContextService.UserId &&
                        user.SystemRole != systemRoleRepository.Admin)
                    {
                        throw new UserNotAllowedException("Brak uprawnień.");
                    }
                });
            RuleFor(dto => dto.NewPassword)
                .NotEmpty()
                .MinimumLength(6);
            RuleFor(dto => dto.ConfirmNewPassword)
                .NotEmpty()
                .MinimumLength(6)
                .Matches(dto => dto.NewPassword);
        }
    }
}
