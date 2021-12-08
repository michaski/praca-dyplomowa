using System;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class AccentedBeats : BaseEntity
    {
        public Metre Metre { get; set; }
        public Guid MetreId { get; set; }
        public int AccentedBeat { get; set; }
    }
}
