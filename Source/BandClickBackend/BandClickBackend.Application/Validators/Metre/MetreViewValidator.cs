using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.Metre
{
    public class MetreViewValidator : AbstractValidator<MetreViewDto>
    {
        public MetreViewValidator(IRhythmicUnitRepository _rhythmicUnitRepository)
        {
            int beatsPerBar = 0;
            RuleFor(dto => dto.BeatsPerBar)
                .NotEmpty()
                .GreaterThan(0)
                .Custom((value, context) => beatsPerBar = value);
            RuleFor(dto => dto.RhythmicUnit)
                .MustAsync(async (rhythmicUnit, token) =>
                    await _rhythmicUnitRepository.GetRhythmicUnitByNumberAsync(rhythmicUnit) is not null)
                .WithMessage("Taka wartość rytmiczna nie istnieje lub nie jest obecnie obsługiwana przez aplikację.");
            RuleFor(dto => dto.AccentedBeats)
                .ForEach(accentedBeat =>
                {
                    accentedBeat.GreaterThan(0);
                    accentedBeat.LessThanOrEqualTo(beatsPerBar);
                })
                .WithMessage("Akcentowane uderzenie musi się mieścić w takcie.");
        }
    }
}
