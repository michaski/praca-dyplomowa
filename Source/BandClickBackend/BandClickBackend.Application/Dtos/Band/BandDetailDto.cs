using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.Playlist;
using BandClickBackend.Application.Dtos.UserInBands;
using BandClickBackend.Application.Mappings;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Dtos.Band
{
    public class BandDetailDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserBandInfo> Members { get; set; }
        public ICollection<PlaylistListDto> Playlists { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Band, BandDetailDto>();
        }
    }
}
