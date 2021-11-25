using System;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Common
{
    public abstract class AuditableEntity : BaseEntity
    {
        public DateTime Created { get; set; }
        public User CreatedBy { get; set; }
        public Guid CreatedById { get; set; }
        public DateTime? LastModified { get; set; }
        public User LastModifiedBy { get; set; }
        public Guid LastModifiedById { get; set; }
    }
}
