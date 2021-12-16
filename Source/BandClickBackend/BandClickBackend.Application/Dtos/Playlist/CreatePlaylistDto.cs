using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.Playlist
{
    public class CreatePlaylistDto : IMap
    {
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<CreatePlaylistDto, Domain.Entities.Playlist>();
        }
    }
}
