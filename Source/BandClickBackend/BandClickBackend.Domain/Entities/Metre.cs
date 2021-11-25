using System;
using System.Collections.Generic;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class Metre : BaseEntity
    {
        public int BeatsPerBar { get; set; }
        public RhythmicUnit RhythmicUnit { get; set; }
        public ICollection<AccentedBeats> AccentedBeats { get; set; }
    }
}
