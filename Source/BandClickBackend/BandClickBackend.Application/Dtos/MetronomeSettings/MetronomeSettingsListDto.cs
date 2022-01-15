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
    public class MetronomeSettingsListDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Tempo { get; set; }
        public MetreViewDto Metre { get; set; }
        public int NumberOfMeasures { get; set; }
        public MetronomeSettingsType Type { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MetronomeSettings, MetronomeSettingsListDto>();
        }
    }
}
