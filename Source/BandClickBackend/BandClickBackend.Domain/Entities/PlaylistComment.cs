﻿using System;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class PlaylistComment : AuditableEntity
    {
        public string Text { get; set; }
        public Guid PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}
