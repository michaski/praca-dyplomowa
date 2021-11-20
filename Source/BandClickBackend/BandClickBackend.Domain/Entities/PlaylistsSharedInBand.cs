using System;

namespace BandClickBackend.Domain.Entities
{
    public class PlaylistsSharedInBand
    {
        public Guid Id { get; set; }
        public Guid BandId { get; set; }
        public Band Band { get; set; }
        public Guid PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}
