using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.MetronomeSettingsComment
{
    public class AddMetronomeSettingsCommentDto : IMap
    {
        public Guid MetronomeSettingsId { get; set; }
        public string Text { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<AddMetronomeSettingsCommentDto, Domain.Entities.MetronomeSettingsComment>();
        }
    }
}
