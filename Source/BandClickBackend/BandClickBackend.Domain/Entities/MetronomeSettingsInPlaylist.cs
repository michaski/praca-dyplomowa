using System;

namespace BandClickBackend.Domain.Entities
{
    public class MetronomeSettingsInPlaylist
    {
        public Guid Id { get; set; }
        public Guid MetronomeSettingsId { get; set; }
        public MetronomeSettings MetronomeSettings { get; set; }
        public Guid PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
        public int PositionInPlaylist { get; set; }
    }
}
