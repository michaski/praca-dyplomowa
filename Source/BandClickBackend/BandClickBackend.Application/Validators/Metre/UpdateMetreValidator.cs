using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;
using FluentValidation.Validators;

namespace BandClickBackend.Application.Validators.Metre
{
    public class UpdateMetreValidator : AbstractValidator<UpdateMetreDto>
    {
        public UpdateMetreValidator(IMetreRepository repository, IRhythmicUnitRepository rhythmicUnitRepository)
        {
            int beatsPerBar = 1;
            RuleFor(dto => dto.Id)
                .NotEmpty()
                .MustAsync(async (guid, token) =>
                    await repository.GetByIdNoTrackingAsync(guid) is not null)
                .WithMessage("Nie znaleziono metrum o podanym Id.");
            RuleFor(dto => dto.RhythmicUnit)
                .MustAsync(async (rhythmicUnit, token) =>
                    await rhythmicUnitRepository.GetRhythmicUnitByNumberNoTrackingAsync(rhythmicUnit) is not null)
                .WithMessage("Taka wartość rytmiczna nie istnieje lub nie jest obecnie obsługiwana przez aplikację.");
            RuleFor(dto => dto.BeatsPerBar)
                .GreaterThan(0)
                .Custom((i, context) => beatsPerBar = i);
            RuleFor(dto => dto.AccentedBeats)
                .ForEach(accentedBeat => accentedBeat.InclusiveBetween(1, beatsPerBar))
                .When(dto => dto.AccentedBeats.Any());
        }
    }
}
