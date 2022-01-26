using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.Filters;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Application.Dtos.Raitings;
using BandClickBackend.Application.Dtos.Shared;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
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
        private readonly IMetronomeSettingsRaitingsRepository _metronomeSettingsRaitingsRepository;
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
            IUserContextService userContextService,
            IBandService bandService, 
            IMetronomeSettingsRaitingsRepository metronomeSettingsRaitingsRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _userContextService = userContextService;
            _bandService = bandService;
            _metronomeSettingsRaitingsRepository = metronomeSettingsRaitingsRepository;
            _metreService = metreService;
            _metronomeSettingsTypeRepository = metronomeSettingsTypeRepository;
            _metreRepository = metreRepository;
            _metronomeSettingsInPlaylistService = metronomeSettingsInPlaylistService;
            _metronomeSettingsCommentRepository = metronomeSettingsCommentRepository;
        }

        public async Task<PagedResult<MetronomeSettingsListDto>> GetAllAsync(QueryFilters filters)
        {
            var result = await _repository.GetAllAsync(filters);
            var mappedResult = new ResultPage<MetronomeSettingsListDto>(
                _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<MetronomeSettingsListDto>>(result.Results) as List<MetronomeSettingsListDto>,
                result.TotalItemsCount);
            return new PagedResult<MetronomeSettingsListDto>(mappedResult, filters);
        }

        public async Task<SingleMetronomeSettingDto> GetByIdAsync(Guid id)
        {
            var entity = await _repository.GetByIdAsync(id);
            var mappedResult = _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(entity);
            mappedResult.PositiveRaitingCount = await _metronomeSettingsRaitingsRepository.GetPositiveRaitingsCountAsync(id);
            mappedResult.NegativeRaitingCount = await _metronomeSettingsRaitingsRepository.GetNegativeRaitingsCountAsync(id);
            return mappedResult;
        }

        public async Task<PagedResult<SharedSettingsDto>> GetAllSharedAsync(QueryFilters filters)
        {
            var result = await _repository.GetAllSharedAsync(filters);
            var mappedResult = new ResultPage<SharedSettingsDto>(
                _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<SharedSettingsDto>>(result.Results) as List<SharedSettingsDto>,
                result.TotalItemsCount);
            foreach (var settingsDto in mappedResult.Results)
            {
                settingsDto.PositiveRaitingCount = await _metronomeSettingsRaitingsRepository.GetPositiveRaitingsCountAsync(settingsDto.Id);
                settingsDto.NegativeRaitingCount = await _metronomeSettingsRaitingsRepository.GetNegativeRaitingsCountAsync(settingsDto.Id);
            }
            return new PagedResult<SharedSettingsDto>(mappedResult, filters);
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

        public async Task<RaitingTypeDto> IsUserRaitingPositiveAsync(Guid settingId)
        {
            int result;
            if (!await _metronomeSettingsRaitingsRepository.HasUserGivenRaitingAsync(settingId))
            {
                result = -1;
            }
            else
            {
                result = await _metronomeSettingsRaitingsRepository.IsUserRaitingPositiveAsync(settingId)
                    ? 1
                    : 0;
            }
            return new RaitingTypeDto() { IsPositive = result };
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
            var mappedResult = _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(
                result);
            mappedResult.PositiveRaitingCount = 0;
            mappedResult.NegativeRaitingCount = 0;
            return mappedResult;
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

        public async Task MoveUpInPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsInPlaylistService.MoveUpInPlaylistAsync(metronomeSettingId, playlistId);
        }

        public async Task MoveDownInPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsInPlaylistService.MoveDownInPlaylistAsync(metronomeSettingId, playlistId);
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
            entity.NumberOfMeasures = dto.NumberOfMeasures;
            entity.Tempo = dto.Tempo;
            if (entity.Type.Id != dto.TypeId)
            {
                entity.Type = await _metronomeSettingsTypeRepository.GetMetronomeSettingsTypeById(dto.TypeId);
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
            if (await _metronomeSettingsRaitingsRepository.HasUserGivenRaitingAsync(id))
            {
                throw new UserNotAllowedException("Można oceniać tylko raz");
            }
            var raiting = new MetronomeSettingsRaiting()
            {
                UserId = (Guid)_userContextService.UserId,
                MetronomeSettingsId = id,
                IsPositive = true
            };
            await _metronomeSettingsRaitingsRepository.AddRaitingAsync(raiting);
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
            if (await _metronomeSettingsRaitingsRepository.HasUserGivenRaitingAsync(id))
            {
                throw new UserNotAllowedException("Można oceniać tylko raz");
            }
            var raiting = new MetronomeSettingsRaiting()
            {
                UserId = (Guid)_userContextService.UserId,
                MetronomeSettingsId = id,
                IsPositive = false
            };
            await _metronomeSettingsRaitingsRepository.AddRaitingAsync(raiting);
        }

        public async Task RemoveUserRaitingAsync(Guid id)
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
            if (!await _metronomeSettingsRaitingsRepository.HasUserGivenRaitingAsync(id))
            {
                throw new UserNotAllowedException("Pozycja nie została jeszcze oceniona");
            }
            await _metronomeSettingsRaitingsRepository.RemoveRaitingAsync(
                await _metronomeSettingsRaitingsRepository.GetUserRaitingAsync(id));
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
            if (!_userContextService.IsEntityCreator(entity) && !_userContextService.IsAdmin)
            {
                throw new UserNotAllowedException("Komentarz może edytować tylko jego twórca lub administrator.");
            }
            entity.Text = comment.Text;
            await _metronomeSettingsCommentRepository.EditCommentAsync(entity);
        }

        public async Task DeleteCommentAsync(Guid id)
        {
            var entity = await _metronomeSettingsCommentRepository.GetByIdAsync(id);
            if (!_userContextService.IsEntityCreator(entity) && !_userContextService.IsAdmin)
            {
                throw new UserNotAllowedException("Komentarz może usunąć tylko jego twórca lub administrator.");
            }
            await _metronomeSettingsCommentRepository.DeleteCommentAsync(id);
        }
    }
}
