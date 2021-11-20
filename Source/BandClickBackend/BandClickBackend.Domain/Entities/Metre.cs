using System;
using System.Collections.Generic;

namespace BandClickBackend.Domain.Entities
{
    public class Metre
    {
        public Guid Id { get; set; }
        public int BeatsPerBar { get; set; }
        public RhythmicUnit RhythmicUnit { get; set; }
        public ICollection<AccentedBeats> AccentedBeats { get; set; }
    }
}
