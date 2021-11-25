using System;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.User
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserValidator(IUserRepository repository)
        {
            RuleFor(dto => dto.Email)
                .NotEmpty()
                .EmailAddress()
            .MustAsync(async (email, token) =>
                await repository.GetUserByEmailAsync(email) is null)
                .WithMessage("Email jest już zajęty.");
            RuleFor(dto => dto.Password)
                .Equal(dto => dto.ConfirmPassword)
                .WithMessage("Hasła muszą być takie same")
                .Custom((password, validationContext) =>
                {
                    bool hasPunct, hasSmallLetter, hasBigLetter, hasNumber;
                    hasPunct = hasSmallLetter = hasBigLetter = hasNumber = false;
                    for (int i = 0; i < password.Length; i++)
                    {
                        if (!hasPunct && (char.IsSymbol(password[i]) || char.IsPunctuation(password[i])))
                        {
                            hasPunct = true;
                        }
                        if (!hasSmallLetter && char.IsLower(password[i]))
                        {
                            hasSmallLetter = true;
                        }
                        if (!hasBigLetter && char.IsUpper(password[i]))
                        {
                            hasBigLetter = true;
                        }
                        if (!hasNumber && char.IsDigit(password[i]))
                        {
                            hasNumber = true;
                        }
                        if (hasBigLetter && hasNumber && hasPunct && hasSmallLetter)
                        {
                            break;
                        }
                    }

                    if (password.Length < 6 || !hasNumber || !hasBigLetter || !hasPunct || !hasSmallLetter)
                    {
                        validationContext.AddFailure("Hasło musi się składać z przynajmniej 6 znaków, w tym conajmniej 1 wielkiej, 1 małej litery, 1 znaku i cyfry");
                    }
                });
            RuleFor(dto => dto.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(64);
            RuleFor(dto => dto.Surname)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(64);
        }
    }
}
