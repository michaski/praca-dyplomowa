using System;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class UserInBands : BaseEntity
    {
        public Guid BandId { get; set; }
        public Band Band { get; set; }
        public Guid MemberId { get; set; }
        public User Member { get; set; }
        public BandRole BandRole { get; set; }
    }
}
