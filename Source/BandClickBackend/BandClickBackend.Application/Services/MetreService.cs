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

        public MetreService(IMetreRepository repository, IRhythmicUnitRepository rhythmicUnitRepository)
        {
            _repository = repository;
            _rhythmicUnitRepository = rhythmicUnitRepository;
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
            var accentedBeats = dto.AccentedBeats
                .Where(b => original.AccentedBeats.SingleOrDefault(ab => ab.AccentedBeat == b) is null);
            foreach (var accentedBeat in accentedBeats)
            {
                original.AccentedBeats.Add(new AccentedBeats()
                {
                    AccentedBeat = accentedBeat,
                    MetreId = original.Id
                });
            }
            return original;
        }
    }
}
