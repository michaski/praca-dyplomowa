using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Playlist;
using FluentValidation;

namespace BandClickBackend.Application.Validators.Playlist
{
    public class CreatePlaylistValidator : AbstractValidator<CreatePlaylistDto>
    {
        public CreatePlaylistValidator()
        {
            RuleFor(dto => dto.Name)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(45);
        }
    }
}
