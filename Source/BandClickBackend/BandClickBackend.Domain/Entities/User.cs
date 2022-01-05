using System;
using System.Collections;
using System.Collections.Generic;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public SystemRole SystemRole { get; set; }
        public ICollection<Playlist> Playlists { get; set; }
        public ICollection<MetronomeSettings> MetronomeSettings { get; set; }
        public ICollection<MetronomeSettingsComment> MetronomeSettingsComment { get; set; }
        public ICollection<PlaylistComment> PlaylistComments { get; set; }
        public ICollection<UserInBands> Bands { get; set; }
    }
}
