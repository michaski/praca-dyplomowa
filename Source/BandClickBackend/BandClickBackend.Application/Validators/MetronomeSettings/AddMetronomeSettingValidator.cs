using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using FluentValidation;

namespace BandClickBackend.Application.Validators.MetronomeSettings
{
    public class AddMetronomeSettingValidator : AbstractValidator<AddMetronomeSettingsDto>
    {
        public AddMetronomeSettingValidator()
        {
            RuleFor(dto => dto.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(45);
            RuleFor(dto => dto.Tempo)
                .NotEmpty()
                .GreaterThan(20)
                .LessThan(300);
            RuleFor(dto => dto.PlaylistId)
                .NotEmpty();
            RuleFor(dto => dto.TypeId)
                .NotEmpty();
        }
    }
}
