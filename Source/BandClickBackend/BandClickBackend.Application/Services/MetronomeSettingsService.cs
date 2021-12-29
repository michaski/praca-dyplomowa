using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;

namespace BandClickBackend.Application.Services
{
    public class MetronomeSettingsService : IMetronomeSettingsService
    {
        private readonly IMetronomeSettingsRepository _repository;
        private readonly IMetronomeSettingsTypeRepository _metronomeSettingsTypeRepository;
        private readonly IMetronomeSettingsInPlaylistService _metronomeSettingsInPlaylistService;
        private readonly IMetreService _metreService;
        private readonly IMetreRepository _metreRepository;
        private readonly IMapper _mapper;

        public MetronomeSettingsService(
            IMetronomeSettingsRepository repository, 
            IMapper mapper, 
            IMetreService metreService, 
            IMetronomeSettingsTypeRepository metronomeSettingsTypeRepository, 
            IMetreRepository metreRepository, 
            IMetronomeSettingsInPlaylistService metronomeSettingsInPlaylistService)
        {
            _repository = repository;
            _mapper = mapper;
            _metreService = metreService;
            _metronomeSettingsTypeRepository = metronomeSettingsTypeRepository;
            _metreRepository = metreRepository;
            _metronomeSettingsInPlaylistService = metronomeSettingsInPlaylistService;
        }

        public async Task<IEnumerable<MetronomeSettingsListDto>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<MetronomeSettingsListDto>>(
                await _repository.GetAllAsync());
        }

        public async Task<SingleMetronomeSettingDto> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            var mappedResult = _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(entity);
            return mappedResult;
        }

        public async Task<IEnumerable<MetronomeSettingsListDto>> GetAllSharedAsync()
        {
            return _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<MetronomeSettingsListDto>>(
                await _repository.GetAllSharedAsync());
        }

        public async Task<IEnumerable<MetronomeSettingsListDto>> GetAllSettingsForUserAsync()
        {
            return _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<MetronomeSettingsListDto>>(
                await _repository.GetAllSettingsForUserAsync());
        }

        public async Task<SingleMetronomeSettingDto> AddAsync(AddMetronomeSettingsDto entity)
        {
            var mappedEntity = _mapper.Map<AddMetronomeSettingsDto, MetronomeSettings>(entity);
            mappedEntity.Metre = await _metreService.MapMetreDtoToMetreAsync(entity.Metre);
            mappedEntity.Type = await _metronomeSettingsTypeRepository.GetMetronomeSettingsTypeById(entity.TypeId);
            var result = await _repository.CreateAsync(mappedEntity);
            if (entity.PlaylistId != Guid.Empty)
            {
                await _metronomeSettingsInPlaylistService.AddMetronomeSettingToPlaylistAsync(
                    result.Id, entity.PlaylistId);
            }
            return _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(
                result);
        }

        public async Task AddToPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsInPlaylistService.AddMetronomeSettingToPlaylistAsync(
                metronomeSettingId, playlistId);
        }

        public async Task RemoveFromPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsInPlaylistService.RemoveMetronomeSettingFromPlaylistAsync(
                metronomeSettingId, playlistId);
        }

        public async Task ChangePositionInPlaylistAsync(Guid metronomeSettingId, Guid playlistId, int newPosition)
        {
            await _metronomeSettingsInPlaylistService.ChangePositionInPlaylistAsync(
                metronomeSettingId, playlistId, newPosition);
        }

        public async Task UpdateAsync(UpdateMetronomeSettingDto dto)
        {
            var entity = await _repository.GetByIdAsync(dto.Id);
            entity.Name = dto.Name;
            entity.NumberOdMeasures = dto.NumberOdMeasures;
            entity.Tempo = dto.Tempo;
            if (entity.Type.Id != dto.TypeId)
            {
                entity.Type = await _metronomeSettingsTypeRepository.GetMetronomeSettingsTypeById(dto.Id);
            }
            await _repository.UpdateAsync(entity);
        }

        public async Task ShareInAppToggleAsync(Guid id)
        {
            await _repository.ShareInAppToggleAsync(
                await _repository.GetByIdAsync(id));
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            await _repository.DeleteAsync(entity);
        }
    }
}
