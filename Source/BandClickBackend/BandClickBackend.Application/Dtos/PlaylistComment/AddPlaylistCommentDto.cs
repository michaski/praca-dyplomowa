using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;
using FluentValidation.Validators;

namespace BandClickBackend.Application.Dtos.PlaylistComment
{
    public class AddPlaylistCommentDto : IMap
    {
        public Guid PlaylistId { get; set; }
        public string Text { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<AddPlaylistCommentDto, Domain.Entities.PlaylistComment>();
        }
    }
}
