using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.Metre
{
    public class UpdateMetreDto : IMap
    {
        public Guid Id { get; set; }
        public int BeatsPerBar { get; set; }
        public int RhythmicUnit { get; set; }
        public IEnumerable<int> AccentedBeats { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Metre, UpdateMetreDto>()
                .ForMember(dto => dto.RhythmicUnit, e => e.MapFrom(m => m.RhythmicUnit.NumericValue))
                .ForMember(dto => dto.AccentedBeats, e => e.MapFrom(m => m.AccentedBeats.Select(ab => ab.AccentedBeat)));
        }
    }
}
