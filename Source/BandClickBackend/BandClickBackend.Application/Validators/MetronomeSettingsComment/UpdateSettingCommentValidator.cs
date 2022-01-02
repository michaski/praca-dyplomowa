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
    public class UpdateSettingCommentValidator : AbstractValidator<UpdateMetronomeSettingsCommentDto>
    {
        public UpdateSettingCommentValidator(IMetronomeSettingsCommentRepository repository)
        {
            RuleFor(dto => dto.Id)
                .NotEmpty()
                .MustAsync(async (id, token) =>
                    await repository.GetByIdAsync(id) is not null)
                .WithMessage("Nie znaleziono komentarza.");
            RuleFor(dto => dto.Text)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(2048);
        }
    }
}
