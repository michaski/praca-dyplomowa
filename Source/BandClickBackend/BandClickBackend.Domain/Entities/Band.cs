using System;
using System.Collections.Generic;

namespace BandClickBackend.Domain.Entities
{
    public class Band
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserInBands> Members { get; set; }
        public ICollection<PlaylistsSharedInBand> Playlists { get; set; }
    }
}
