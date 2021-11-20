
namespace BandClickBackend.Domain.Common
{
    public abstract class ShareableEntity : AuditableEntity
    {
        public bool IsShared { get; set; }
        public int? PositiveRaitingCount { get; set; }
        public int? NegativeRaitingCount { get; set; }
    }
}
