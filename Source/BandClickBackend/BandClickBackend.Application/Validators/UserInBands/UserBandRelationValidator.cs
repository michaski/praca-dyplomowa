using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.UserInBands;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.UserInBands
{
    public class UserBandRelationValidator : AbstractValidator<UserBandRelationDto>
    {
        public UserBandRelationValidator(
            IUserRepository userRepository,
            IBandRepository bandRepository)
        {
            //RuleFor(dto => dto.UserEmail)
            //    .NotEmpty()
            //    .EmailAddress()
            //    .MinimumLength(5)
            //    .MaximumLength(64)
            //    .MustAsync(async (email, token) =>
            //        await userRepository.GetUserByEmailAsync(email) is not null)
            //    .WithMessage("Użytkownik o podanym adresie email nie istnieje.");
            RuleFor(dto => dto.Username)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(64)
                .MustAsync(async (username, token) =>
                    await userRepository.GetUserByUsernameAsync(username) is null)
                .WithMessage("Nazwa użytkownika jest już zajęta.");
            RuleFor(dto => dto.BandId)
                .NotEmpty()
                .MustAsync(async (id, token) =>
                    await bandRepository.GetBandByIdAsync(id) is not null)
                .WithMessage("Nie znaleziono zespołu.");
        }
    }
}
