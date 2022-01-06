using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Exceptions;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Services
{
    public class MetronomeSettingsService : IMetronomeSettingsService
    {
        private readonly IMetronomeSettingsRepository _repository;
        private readonly IMetronomeSettingsTypeRepository _metronomeSettingsTypeRepository;
        private readonly IMetronomeSettingsInPlaylistService _metronomeSettingsInPlaylistService;
        private readonly IMetronomeSettingsCommentRepository _metronomeSettingsCommentRepository;
        private readonly IMetreService _metreService;
        private readonly IMetreRepository _metreRepository;
        private readonly IUserContextService _userContextService;
        private readonly IBandService _bandService;
        private readonly IMapper _mapper;

        public MetronomeSettingsService(
            IMetronomeSettingsRepository repository,
            IMetreService metreService,
            IMetronomeSettingsTypeRepository metronomeSettingsTypeRepository,
            IMetreRepository metreRepository,
            IMetronomeSettingsInPlaylistService metronomeSettingsInPlaylistService,
            IMetronomeSettingsCommentRepository metronomeSettingsCommentRepository,
            IMapper mapper,
            IUserContextService userContextService, IBandService bandService)
        {
            _repository = repository;
            _mapper = mapper;
            _userContextService = userContextService;
            _bandService = bandService;
            _metreService = metreService;
            _metronomeSettingsTypeRepository = metronomeSettingsTypeRepository;
            _metreRepository = metreRepository;
            _metronomeSettingsInPlaylistService = metronomeSettingsInPlaylistService;
            _metronomeSettingsCommentRepository = metronomeSettingsCommentRepository;
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

        public async Task<IEnumerable<MetronomeSettingsType>> GetAvailableSettingTypesAsync()
        {
            return await _metronomeSettingsTypeRepository.GetAllMetronomeSettingsTypesAsync();
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

        public async Task ChangeTypeAsync(Guid settingId, Guid typeId)
        {
            var entity = await _repository.GetByIdAsync(settingId);
            entity.Type = await _metronomeSettingsTypeRepository.GetMetronomeSettingsTypeById(typeId);
            await _repository.UpdateAsync(entity);
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

        public async Task UpdateAsync(UpdateMetronomeSettingDto dto, Guid? bandId)
        {
            var entity = await _repository.GetByIdAsync(dto.Id);

            if (!_userContextService.IsEntityCreator(entity))
            {
                if (bandId is null || !(
                        await _bandService.IsUserInBandWithAsync(entity.CreatedById, (Guid)bandId) &&
                        await _bandService.MetronomeSettingIsSharedInBandAsync(dto.Id, (Guid)bandId)
                        )
                    )
                {
                    throw new UserNotAllowedException("Pozycję może edytować tylko jej twórca lub członek zespołu, w którym została udostępniona.");
                }
            }
            entity.Name = dto.Name;
            entity.NumberOdMeasures = dto.NumberOdMeasures;
            entity.Tempo = dto.Tempo;
            if (entity.Type.Id != dto.TypeId)
            {
                entity.Type = await _metronomeSettingsTypeRepository.GetMetronomeSettingsTypeById(dto.Id);
            }
            await _repository.UpdateAsync(entity);
        }

        public async Task AddPositiveRaitingAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Nie można oceniać swoich pozycji");
            }
            if (entity.PositiveRaitingCount is not null)
            {
                entity.PositiveRaitingCount++;
            }
            else
            {
                entity.PositiveRaitingCount = 1;
            }
            await _repository.UpdateAsync(entity);
        }

        public async Task AddNegativeRaitingAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Nie można oceniać swoich pozycji");
            }
            if (entity.NegativeRaitingCount is not null)
            {
                entity.NegativeRaitingCount++;
            }
            else
            {
                entity.NegativeRaitingCount = 1;
            }
            await _repository.UpdateAsync(entity);
        }

        public async Task RemovePositiveRaitingAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Nie można oceniać swoich pozycji");
            }
            if (entity.PositiveRaitingCount is not null && entity.PositiveRaitingCount > 0)
            {
                entity.PositiveRaitingCount--;
            }
            else
            {
                entity.PositiveRaitingCount = 0;
            }
            await _repository.UpdateAsync(entity);
        }

        public async Task RemoveNegativeRaitingAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Nie można oceniać swoich pozycji");
            }
            if (entity.NegativeRaitingCount is not null && entity.NegativeRaitingCount > 0)
            {
                entity.NegativeRaitingCount--;
            }
            else
            {
                entity.NegativeRaitingCount = 0;
            }
            await _repository.UpdateAsync(entity);
        }

        public async Task ShareInAppToggleAsync(Guid id)
        {
            var entity = await _repository.GetByIdNoTrackingAsync(id);
            if (!_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Pozycję może edytować tylko jej twórca.");
            }
            await _repository.ShareInAppToggleAsync(
                await _repository.GetByIdAsync(id));
        }

        public async Task RemoveFromSharedInAppAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            entity.IsShared = false;
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (!_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Pozycję może usunąć tylko jej twórca.");
            }
            await _repository.DeleteAsync(entity);
        }

        public async Task<IEnumerable<MetronomeSettingsCommentDetailsDto>> GetAllCommentsAsync(Guid id)
        {
            return _mapper.Map<IEnumerable<MetronomeSettingsComment>, IEnumerable<MetronomeSettingsCommentDetailsDto>>(
                await _metronomeSettingsCommentRepository.GetSettingsCommentsAsync(id));
        }

        public async Task<MetronomeSettingsCommentDetailsDto> AddCommentAsync(AddMetronomeSettingsCommentDto comment)
        {
            var mappedComment = _mapper.Map<AddMetronomeSettingsCommentDto, MetronomeSettingsComment>(comment);
            return _mapper.Map<MetronomeSettingsComment, MetronomeSettingsCommentDetailsDto>(
                await _metronomeSettingsCommentRepository.AddCommentAsync(mappedComment));
        }

        public async Task EditCommentAsync(UpdateMetronomeSettingsCommentDto comment)
        {
            var entity = await _metronomeSettingsCommentRepository.GetByIdAsync(comment.Id);
            if (!_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Komentarz może edytować tylko jego twórca.");
            }
            entity.Text = comment.Text;
            await _metronomeSettingsCommentRepository.EditCommentAsync(entity);
        }

        public async Task DeleteCommentAsync(Guid id)
        {
            var entity = await _metronomeSettingsCommentRepository.GetByIdAsync(id);
            if (!_userContextService.IsEntityCreator(entity))
            {
                throw new UserNotAllowedException("Komentarz może usunąć tylko jego twórca.");
            }
            await _metronomeSettingsCommentRepository.DeleteCommentAsync(id);
        }
    }
}
