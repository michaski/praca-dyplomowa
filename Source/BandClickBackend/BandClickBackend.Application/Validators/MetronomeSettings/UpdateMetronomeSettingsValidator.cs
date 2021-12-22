using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.MetronomeSettings
{
    public class UpdateMetronomeSettingsValidator : AbstractValidator<UpdateMetronomeSettingDto>
    {
        public UpdateMetronomeSettingsValidator(
            IMetronomeSettingsRepository repository,
            IMetronomeSettingsTypeRepository metronomeSettingsTypeRepository)
        {
            RuleFor(dto => dto.Id)
                .NotEmpty()
                .MustAsync(async (guid, token) =>
                    await repository.GetByIdAsync(guid) is not null)
                .WithMessage("Nie znaleziono ustawienia o podanym Id.");
            RuleFor(dto => dto.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(45);
            RuleFor(dto => dto.NumberOdMeasures)
                .GreaterThan(0);
            RuleFor(dto => dto.Tempo)
                .GreaterThan(0)
                .LessThanOrEqualTo(500);
            RuleFor(dto => dto.TypeId)
                .NotEmpty()
                .MustAsync(async (guid, token) =>
                    await metronomeSettingsTypeRepository.GetMetronomeSettingsTypeById(guid) is not null)
                .WithMessage("Brak odpowiedniego typu.");
        }
    }
}
