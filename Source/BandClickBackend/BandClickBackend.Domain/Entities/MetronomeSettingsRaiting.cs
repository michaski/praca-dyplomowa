using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class MetronomeSettingsRaiting : BaseEntity
    {
        public MetronomeSettings MetronomeSettings { get; set; }
        public Guid MetronomeSettingsId { get; set; }
        public bool IsPositive { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}
