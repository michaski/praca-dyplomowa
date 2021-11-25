using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class RhythmicUnit : BaseEntity
    {
        public int NumericValue { get; set; }
        public string DisplayName { get; set; }
    }
}
