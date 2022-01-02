using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.MetronomeSettingsComment
{
    public class AddSettingCommentValidator : AbstractValidator<AddMetronomeSettingsCommentDto>
    {
        public AddSettingCommentValidator(IMetronomeSettingsRepository repository)
        {
            RuleFor(dto => dto.MetronomeSettingsId)
                .NotEmpty()
                .CustomAsync(async (id, context, token) =>
                {
                    var metronomeSetting = await repository.GetByIdAsync(id);
                    if (metronomeSetting is null)
                    {
                        context.AddFailure("Nie znaleziono ustawienia metronomu.");
                    }
                    else if (!metronomeSetting.IsShared)
                    {
                        context.AddFailure("Nie można komentować nieudostępnionej pozycji.");
                    }
                });
            RuleFor(dto => dto.Text)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(2048);
        }
    }
}
