using System;
using System.Collections.Generic;
namespace BandClickBackend.Domain.Utils
{
    public class Config
    {
        public SuperAdminConfig SuperAdmin { get; set; }
        public List<string> SystemRoles { get; set; }
        public List<string> BandRoles { get; set; }
        public List<int> RhythmicUnits { get; set; }
        public List<string> RhythmicUnitsNames { get; set; }
        public List<string> MetronomeSettingsTypes { get; set; }
    }
}
