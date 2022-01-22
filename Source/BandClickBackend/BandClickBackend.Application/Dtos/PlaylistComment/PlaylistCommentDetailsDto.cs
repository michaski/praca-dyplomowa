﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.PlaylistComment
{
    public class PlaylistCommentDetailsDto : IMap
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string Author { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime? LastModified { get; set; }
        public Guid LastModifiedById { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.PlaylistComment, PlaylistCommentDetailsDto>()
                .ForMember(dto => dto.Author, cfg => cfg.MapFrom(c => c.CreatedBy.Username));
        }
    }
}
