
using System.Collections.Generic;

namespace BandClickBackend.Domain.Common
{
    public abstract class ShareableEntity<T> : AuditableEntity
    {
        public bool IsShared { get; set; }
        public IEnumerable<T> Raitings { get; set; }
    }
}
