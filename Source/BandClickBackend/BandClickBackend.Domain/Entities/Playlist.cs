﻿using System;
using System.Collections.Generic;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class Playlist : ShareableEntity<PlaylistRaiting>
    {
        public string Name { get; set; }
        public ICollection<MetronomeSettingsInPlaylist> MetronomeSettings { get; set; }
        public ICollection<PlaylistComment> Comments { get; set; }
        public ICollection<PlaylistsSharedInBand> Bands { get; set; }
    }
}
