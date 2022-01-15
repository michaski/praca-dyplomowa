using System;
using System.Collections.Generic;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class MetronomeSettings : ShareableEntity<MetronomeSettingsRaiting>
    {
        public string Name { get; set; }
        public int NumberOfMeasures { get; set; }
        public int Tempo { get; set; }
        public Metre Metre { get; set; }
        public MetronomeSettingsType Type { get; set; }
        public ICollection<MetronomeSettingsComment> Comments { get; set; }
        public ICollection<MetronomeSettingsInPlaylist> Playlists { get; set; }
    }
}
