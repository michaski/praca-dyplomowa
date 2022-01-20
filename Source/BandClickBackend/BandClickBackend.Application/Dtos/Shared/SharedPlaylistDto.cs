using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.Shared
{
    public class SharedPlaylistDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int PositiveRaitingCount { get; set; }
        public int NegativeRaitingCount { get; set; }
        public int CommentsCount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Playlist, SharedPlaylistDto>()
                .ForMember(dto => dto.Author, cfg => cfg.MapFrom(p => p.CreatedBy.Username))
                .ForMember(dto => dto.CommentsCount, cfg => cfg.MapFrom(ms => ms.Comments.Count));
        }
    }
}
