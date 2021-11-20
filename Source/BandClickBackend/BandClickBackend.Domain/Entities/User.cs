using System;
using System.Collections;
using System.Collections.Generic;

namespace BandClickBackend.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
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
