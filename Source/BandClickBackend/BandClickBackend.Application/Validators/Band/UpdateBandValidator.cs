using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Band;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.Band
{
    public class UpdateBandValidator : AbstractValidator<UpdateBandDto>
    {
        public UpdateBandValidator(IBandRepository repository)
        {
            RuleFor(dto => dto.Id)
                .MustAsync(async (id, token) =>
                    await repository.GetBandByIdAsync(id) is not null);
            RuleFor(dto => dto.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(64);
        }
    }
}
