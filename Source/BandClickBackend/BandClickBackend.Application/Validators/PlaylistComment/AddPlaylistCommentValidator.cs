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
    public class AddPlaylistCommentValidator : AbstractValidator<AddPlaylistCommentDto>
    {
        public AddPlaylistCommentValidator(IPlaylistRepository repository)
        {
            RuleFor(dto => dto.PlaylistId)
                .NotEmpty()
                .CustomAsync(async (id, context, token) =>
                {
                    var playlist = await repository.GetPlaylistByIdAsync(id);
                    if (playlist is null)
                    {
                        context.AddFailure("Nie znaleziono playlisty.");
                    }
                    else if (!playlist.IsShared)
                    {
                        context.AddFailure("Nie można komentować nieudostępnionej playlisty.");
                    }
                });
            RuleFor(dto => dto.Text)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(2048);
        }
    }
}
