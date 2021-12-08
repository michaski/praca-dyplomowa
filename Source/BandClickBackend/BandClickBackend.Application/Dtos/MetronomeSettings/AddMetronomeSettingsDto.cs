using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Application.Mappings;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Dtos.MetronomeSettings
{
    public class AddMetronomeSettingsDto : IMap
    {
        public string Name { get; set; }
        public int? NumberOdMeasures { get; set; } = 4;
        public int Tempo { get; set; } = 80;
        public MetreViewDto Metre { get; set; }
        public Guid TypeId { get; set; }
        public Guid PlaylistId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<AddMetronomeSettingsDto, Domain.Entities.MetronomeSettings>()
                .ForMember(dto => dto.Metre, e => e.Ignore())
                .ForMember(ms => ms.Type, e => e.Ignore());
        }
    }
}
