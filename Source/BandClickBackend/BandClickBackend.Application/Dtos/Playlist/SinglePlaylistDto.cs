using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.PlaylistComment;
using BandClickBackend.Application.Mappings;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Dtos.Playlist
{
    public class SinglePlaylistDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<MetronomeSettingsListDto> MetronomeSettings { get; set; }
        public IEnumerable<PlaylistCommentDto> Comments { get; set; }
    }
}
