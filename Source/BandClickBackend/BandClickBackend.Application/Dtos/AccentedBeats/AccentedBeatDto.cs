using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.AccentedBeats
{
    public class AccentedBeatDto : IMap
    {
        public int AccentedBeat { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.AccentedBeats, AccentedBeatDto>();
        }
    }
}
