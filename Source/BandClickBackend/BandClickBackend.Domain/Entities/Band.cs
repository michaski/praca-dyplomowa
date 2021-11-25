using System;
using System.Collections.Generic;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class Band : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<UserInBands> Members { get; set; }
        public ICollection<PlaylistsSharedInBand> Playlists { get; set; }
    }
}
