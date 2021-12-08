﻿using System;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.MetronomeSettingsComment
{
    public class MetronomeSettingsCommentDto : IMap
    {
        public string Text { get; set; }
        public DateTime Created { get; set; }
        public Guid CreatedById { get; set; }
        public DateTime? LastModified { get; set; }
        public Guid LastModifiedById { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MetronomeSettingsComment, MetronomeSettingsCommentDto>();
        }
    }
}
