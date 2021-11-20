using System;

namespace BandClickBackend.Domain.Entities
{
    public class AccentedBeats
    {
        public Guid Id { get; set; }
        public Metre Metre { get; set; }
        public int AccentedBeat { get; set; }
    }
}
