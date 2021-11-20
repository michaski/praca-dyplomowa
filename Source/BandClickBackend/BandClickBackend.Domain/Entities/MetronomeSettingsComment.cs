using System;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class MetronomeSettingsComment : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid MetronomeSettingsId { get; set; }
        public MetronomeSettings MetronomeSettings { get; set; }
    }
}
