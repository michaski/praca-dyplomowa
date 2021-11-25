using System;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class PlaylistsSharedInBand : BaseEntity
    {
        public Guid BandId { get; set; }
        public Band Band { get; set; }
        public Guid PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}
