using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Playlist;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Validators.Playlist
{
    public class EditPlaylistValidator : AbstractValidator<EditPlaylistDto>
    {
        public EditPlaylistValidator(IPlaylistRepository repository)
        {
            RuleFor(dto => dto.Id)
                .NotEmpty()
                .MustAsync(async (guid, token) =>
                    await repository.GetPlaylistByIdAsync(guid) is not null)
                .WithMessage("Nie znaleziono playlisty o podanym Id.");
            RuleFor(dto => dto.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(45);
        }
    }
}
