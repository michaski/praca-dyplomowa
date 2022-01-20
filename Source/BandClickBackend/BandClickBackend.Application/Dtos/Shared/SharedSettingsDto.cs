using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.Shared
{
    public class SharedSettingsDto : IMap
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Tempo { get; set; }
        public MetreViewDto Metre { get; set; }
        public int PositiveRaitingCount { get; set; }
        public int NegativeRaitingCount { get; set; }
        public int CommentsCount { get; set; }
        public string Author { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public DateTime? LastModified { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MetronomeSettings, SharedSettingsDto>()
                .ForMember(dto => dto.Author, cfg => cfg.MapFrom(ms => ms.CreatedBy.Username))
                .ForMember(dto => dto.CommentsCount, cfg => cfg.MapFrom(ms => ms.Comments.Count))
                .ForMember(dto => dto.Type, cfg => cfg.MapFrom(e => e.Type.Name));
        }
    }
}
