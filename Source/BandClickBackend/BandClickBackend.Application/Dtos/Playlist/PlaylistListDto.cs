using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.Playlist
{
    public class PlaylistListDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Playlist, PlaylistListDto>();
        }
    }
}
