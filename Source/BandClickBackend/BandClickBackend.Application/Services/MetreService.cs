using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;

namespace BandClickBackend.Application.Services
{
    public class MetreService : IMetreService
    {
        private readonly IMetreRepository _repository;
        private readonly IRhythmicUnitRepository _rhythmicUnitRepository;
        private readonly IAccentedBeatsRepository _accentedBeatsRepository;

        public MetreService(IMetreRepository repository, IRhythmicUnitRepository rhythmicUnitRepository, IAccentedBeatsRepository accentedBeatsRepository)
        {
            _repository = repository;
            _rhythmicUnitRepository = rhythmicUnitRepository;
            _accentedBeatsRepository = accentedBeatsRepository;
        }

        public async Task UpdateAsync(UpdateMetreDto dto)
        {
            var mappedEntity = await MapMetreDtoToMetreAsync(dto);
            await _repository.UpdateAsync(mappedEntity);
        }

        public async Task<Metre> MapMetreDtoToMetreAsync(MetreViewDto dto)
        {
            var entity = new Metre()
            {
                BeatsPerBar = dto.BeatsPerBar,
                RhythmicUnit = await _rhythmicUnitRepository.GetRhythmicUnitByNumberAsync(dto.RhythmicUnit)
            };
            var accentedBeats = new List<AccentedBeats>();
            foreach (var accentedBeat in dto.AccentedBeats)
            {
                accentedBeats.Add(new AccentedBeats()
                {
                    AccentedBeat = accentedBeat,
                    MetreId = entity.Id
                });
            }
            entity.AccentedBeats = accentedBeats;
            return entity;
        }

        public async Task<Metre> MapMetreDtoToMetreAsync(UpdateMetreDto dto)
        {
            var original = await _repository.GetByIdNoTrackingAsync(dto.Id);
            if (dto.RhythmicUnit != original.RhythmicUnit.NumericValue)
            {
                original.RhythmicUnit = await _rhythmicUnitRepository.GetRhythmicUnitByNumberAsync(dto.RhythmicUnit);
            }
            if (dto.BeatsPerBar != original.BeatsPerBar)
            {
                original.BeatsPerBar = dto.BeatsPerBar;
            }
            var newAccentedBeats = dto.AccentedBeats
                .Where(b => original.AccentedBeats.SingleOrDefault(ab => ab.AccentedBeat == b) is null);
            foreach (var accentedBeat in newAccentedBeats)
            {
                if (accentedBeat > 0 && accentedBeat <= original.BeatsPerBar)
                {
                    original.AccentedBeats.Add(new AccentedBeats()
                    {
                        AccentedBeat = accentedBeat,
                        MetreId = original.Id
                    });
                }
            }
            var accentedBeatsToDelete = original.AccentedBeats
                .Where(b => dto.AccentedBeats.SingleOrDefault(x => x == b.AccentedBeat) == 0)
                .ToList();
            foreach (var accentedBeat in accentedBeatsToDelete)
            {
                await _accentedBeatsRepository.DeleteAsync(accentedBeatsToDelete[0]);
            }
            return original;
        }
    }
}
