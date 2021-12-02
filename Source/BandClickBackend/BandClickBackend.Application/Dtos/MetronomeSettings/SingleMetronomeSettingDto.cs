using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Dtos.MetronomeSettings
{
    public class SingleMetronomeSettingDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int NumberOdMeasures { get; set; }
        public int Tempo { get; set; }
        public Metre Metre { get; set; }
        public MetronomeSettingsType Type { get; set; }
        public ICollection<MetronomeSettingsComment> Comments { get; set; }
        public bool IsShared { get; set; }
        public int? PositiveRaitingCount { get; set; }
        public int? NegativeRaitingCount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MetronomeSettings, SingleMetronomeSettingDto>()
                .ReverseMap();
        }
    }
}
