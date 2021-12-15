using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.IntegrationTests.Utils;

namespace BandClickBackend.IntegrationTests.MetronomeSettingsRepository
{
    public class MetronomeSettingsRepositoryTestBase : IntegrationTestBase
    {
        private List<MetronomeSettings> _metronomeSettings { get; set; }
        private List<MetronomeSettingsType> _metronomeSettingsTypes { get; set; }
        private List<Metre> _metres { get; set; }
        private List<RhythmicUnit> _rhythmicUnits { get; set; }
        private List<AccentedBeats> _accentedBeats { get; set; }

        public override void SeedDb()
        {
            _metronomeSettingsTypes = new List<MetronomeSettingsType>()
            {
                new MetronomeSettingsType()
                {
                    Name = "Song"
                },
                new MetronomeSettingsType()
                {
                    Name = "Exercise"
                }
            };
            Context.MetronomeSettingsTypes.AddRange(_metronomeSettingsTypes);
            _rhythmicUnits = new List<RhythmicUnit>()
            {
                new RhythmicUnit()
                {
                    NumericValue = 4,
                    DisplayName = "Quarter-note"
                },
                new RhythmicUnit()
                {
                    NumericValue = 8,
                    DisplayName = "Eight-note"
                },
                new RhythmicUnit()
                {
                    NumericValue = 16,
                    DisplayName = "Sixteenth-note"
                }
            };
            Context.RhythmicUnits.AddRange(_rhythmicUnits);
            Context.SaveChanges();
            _metres = new List<Metre>()
            {
                new Metre()
                {
                    BeatsPerBar = 4,
                    RhythmicUnit = Context.RhythmicUnits.SingleOrDefault(ru => ru.NumericValue == 4),
                    AccentedBeats = Context.AccentedBeats.Where(ab => ab.AccentedBeat == 1).ToList()
                }
            };
            Context.Metres.AddRange(_metres);
            Context.SaveChanges();
            _accentedBeats = new List<AccentedBeats>()
            {
                new AccentedBeats()
                {
                    AccentedBeat = 1,
                    Metre = Context.Metres.SingleOrDefault(m => m.BeatsPerBar == 4)
                }
            };
            Context.AccentedBeats.AddRange(_accentedBeats);
            Context.SaveChanges();
            _metronomeSettings = new List<MetronomeSettings>()
            {
                new MetronomeSettings()
                {
                    Name = "Setting 1",
                    Type = Context.MetronomeSettingsTypes.SingleOrDefault(mst => mst.Name == "Song"),
                    Metre = Context.Metres.SingleOrDefault(m => m.BeatsPerBar == 4),
                    Tempo = 80,
                    IsShared = false
                }
            };
            Context.MetronomeSettings.AddRange(_metronomeSettings);
            Context.SaveChanges();
        }
    }
}
