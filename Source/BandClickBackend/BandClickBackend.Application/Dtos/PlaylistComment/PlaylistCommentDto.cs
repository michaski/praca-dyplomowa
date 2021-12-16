using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.PlaylistComment
{
    public class PlaylistCommentDto : IMap
    {
        public string Text { get; set; }
        public DateTime Created { get; set; }
        public Guid CreatedById { get; set; }
        public DateTime? LastModified { get; set; }
        public Guid LastModifiedById { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.PlaylistComment, PlaylistCommentDto>();
        }
    }
}
