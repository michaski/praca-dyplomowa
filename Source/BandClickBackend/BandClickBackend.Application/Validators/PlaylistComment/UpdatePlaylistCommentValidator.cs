using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.PlaylistComment;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.PlaylistComment
{
    public class UpdatePlaylistCommentValidator : AbstractValidator<UpdatePlaylistCommentDto>
    {
        public UpdatePlaylistCommentValidator(IPlaylistCommentRepository repository)
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
