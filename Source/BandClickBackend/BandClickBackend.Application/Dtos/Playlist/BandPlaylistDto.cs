using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.Playlist
{
    public class BandPlaylistDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<MetronomeSettingsListDto> MetronomeSettings { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Playlist, BandPlaylistDto>()
                .ForMember(dto => dto.MetronomeSettings, memberOptions => 
                    memberOptions.MapFrom(p => p.MetronomeSettings.Select(ms => ms.MetronomeSettings)));
        }
    }
}
