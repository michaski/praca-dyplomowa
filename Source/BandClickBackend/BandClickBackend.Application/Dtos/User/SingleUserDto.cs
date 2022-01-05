using System;
using AutoMapper;
using BandClickBackend.Application.Mappings;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Dtos.User
{
    public class SingleUserDto : IMap
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string SystemRole { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.User, SingleUserDto>()
                .ForMember(dto => dto.SystemRole, x => x.MapFrom(u => u.SystemRole.Name));
        }
    }
}
