using System;

namespace BandClickBackend.Domain.Entities
{
    public class RhythmicUnit
    {
        public Guid Id { get; set; }
        public int NumericValue { get; set; }
        public string DisplayName { get; set; }
    }
}
