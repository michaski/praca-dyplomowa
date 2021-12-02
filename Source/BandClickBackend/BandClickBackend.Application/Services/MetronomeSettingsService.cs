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
        private readonly IMapper _mapper;

        public MetronomeSettingsService(IMetronomeSettingsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MetronomeSettingsListDto>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<MetronomeSettingsListDto>>(
                await _repository.GetAllAsync());
        }

        public async Task<SingleMetronomeSettingDto> GetByIdAsync(Guid id)
        {
            return _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(
                await _repository.GetByIdAsync(id));
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
            var result = await _repository.CreateAsync(mappedEntity);
            return _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(
                result);
        }

        public async Task UpdateAsync(SingleMetronomeSettingDto entity)
        {
            var mappedEntity = _mapper.Map<SingleMetronomeSettingDto, MetronomeSettings>(entity);
            await _repository.UpdateAsync(mappedEntity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            await _repository.DeleteAsync(entity);
        }
    }
}
