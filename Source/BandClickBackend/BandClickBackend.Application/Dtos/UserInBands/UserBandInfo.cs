using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Mappings;
using BandClickBackend.Domain.Entities;
using FluentValidation.Validators;

namespace BandClickBackend.Application.Dtos.UserInBands
{
    public class UserBandInfo : IMap
    {
        //public Guid UserId { get; set; }
        public BandMemberDto Member { get; set; }
        public string BandRole { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.UserInBands, UserBandInfo>()
                //.ForMember(dto => dto.UserId, x => x.MapFrom(e => e.MemberId))
                .ForMember(dto => dto.BandRole, x => x.MapFrom(e => e.BandRole.Name));
        }
    }
}
