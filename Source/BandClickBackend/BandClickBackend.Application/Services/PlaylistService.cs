using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.Playlist;
using BandClickBackend.Application.Dtos.PlaylistComment;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using FluentValidation;

namespace BandClickBackend.Application.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _repository;
        private readonly IMetronomeSettingsRepository _metronomeSettingsRepository;
        private readonly IMetronomeSettingsInPlaylistService _metronomeSettingsInPlaylistService;
        private readonly IPlaylistSharedInBandRepository _playlistSharedInBandRepository;
        private readonly IPlaylistCommentRepository _playlistCommentRepository;
        private readonly IMapper _mapper;

        public PlaylistService(
            IPlaylistRepository repository, 
            IMetronomeSettingsRepository metronomeSettingsRepository, 
            IMetronomeSettingsInPlaylistService metronomeSettingsInPlaylistService, 
            IPlaylistSharedInBandRepository playlistSharedInBandRepository, 
            IPlaylistCommentRepository playlistCommentRepository,
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
            _playlistCommentRepository = playlistCommentRepository;
            _metronomeSettingsRepository = metronomeSettingsRepository;
            _metronomeSettingsInPlaylistService = metronomeSettingsInPlaylistService;
            _playlistSharedInBandRepository = playlistSharedInBandRepository;
        }

        public async Task<IEnumerable<PlaylistListDto>> GetAllPlaylistsForUserAsync()
        {
            return _mapper.Map<IEnumerable<Playlist>, IEnumerable<PlaylistListDto>>(
                await _repository.GetAllPlaylistsForUserAsync());
        }

        public async Task<IEnumerable<PlaylistListDto>> GetAllSharedPlaylistsAsync()
        {
            return _mapper.Map<IEnumerable<Playlist>, IEnumerable<PlaylistListDto>>(
                await _repository.GetAllSharedPlaylistsAsync());
        }

        public async Task<SinglePlaylistDto> GetPlaylistByIdAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            return await MapPlaylistEntityToSinglePlaylistDto(entity);
        }

        public async Task<SinglePlaylistDto> AddPlaylistAsync(CreatePlaylistDto playlist)
        {
            var mappedPlaylist = _mapper.Map<CreatePlaylistDto, Playlist>(playlist);
            var result = await _repository.AddPlaylistAsync(mappedPlaylist);
            return await MapPlaylistEntityToSinglePlaylistDto(result);
        }

        public async Task UpdatePlaylistAsync(EditPlaylistDto playlist)
        {
            var entity = await _repository.GetPlaylistByIdAsync(playlist.Id);
            entity.Name = playlist.Name;
            await _repository.UpdatePlaylistAsync(entity);
        }

        public async Task AddPositiveRaitingAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (entity.PositiveRaitingCount is not null)
            {
                entity.PositiveRaitingCount++;
            }
            else
            {
                entity.PositiveRaitingCount = 1;
            }
            await _repository.UpdatePlaylistAsync(entity);
        }

        public async Task AddNegativeRaitingAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (entity.NegativeRaitingCount is not null)
            {
                entity.NegativeRaitingCount++;
            }
            else
            {
                entity.NegativeRaitingCount = 1;
            }
            await _repository.UpdatePlaylistAsync(entity);
        }

        public async Task RemovePositiveRaitingAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (entity.PositiveRaitingCount is not null && entity.PositiveRaitingCount > 0)
            {
                entity.PositiveRaitingCount--;
            }
            else
            {
                entity.PositiveRaitingCount = 0;
            }
            await _repository.UpdatePlaylistAsync(entity);
        }

        public async Task RemoveNegativeRaitingAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            if (!entity.IsShared)
            {
                throw new ValidationException("Nie można ocenić nieudostępnionej pozycji.");
            }
            if (entity.NegativeRaitingCount is not null && entity.NegativeRaitingCount > 0)
            {
                entity.NegativeRaitingCount--;
            }
            else
            {
                entity.NegativeRaitingCount = 0;
            }
            await _repository.UpdatePlaylistAsync(entity);
        }

        public async Task ShareInAppToggleAsync(Guid id)
        {
            await _repository.ShareInAppToggleAsync(
                await _repository.GetPlaylistByIdAsync(id));
        }

        public async Task RemoveFromSharedInAppAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            entity.IsShared = false;
            await _repository.UpdatePlaylistAsync(entity);
        }

        public async Task ShareInBandAsync(Guid playlistId, Guid bandId)
        {
            await _playlistSharedInBandRepository.SharePlaylistInBandAsync(bandId, playlistId);
        }

        public async Task RemoveFromBandAsync(Guid playlistId, Guid bandId)
        {
            await _playlistSharedInBandRepository.RemovePlaylistFromBandAsync(bandId, playlistId);
        }

        public async Task DeletePlaylistAsync(Guid id)
        {
            var entity = await _repository.GetPlaylistByIdAsync(id);
            await _repository.DeletePlaylistAsync(entity);
        }

        public async Task<IEnumerable<PlaylistCommentDetailsDto>> GetPlaylistsCommentsAsync(Guid playlistId)
        {
            return _mapper.Map<IEnumerable<PlaylistComment>, IEnumerable<PlaylistCommentDetailsDto>>(
                await _playlistCommentRepository.GetPlaylistsCommentsAsync(playlistId));
        }

        public async Task<PlaylistCommentDetailsDto> AddCommentAsync(AddPlaylistCommentDto comment)
        {
            var mappedComment = _mapper.Map<AddPlaylistCommentDto, PlaylistComment>(comment);
            return _mapper.Map<PlaylistComment, PlaylistCommentDetailsDto>(
                await _playlistCommentRepository.AddCommentAsync(mappedComment));
        }

        public async Task EditCommentAsync(UpdatePlaylistCommentDto comment)
        {
            var entity = await _playlistCommentRepository.GetByIdAsync(comment.Id);
            entity.Text = comment.Text;
            await _playlistCommentRepository.EditCommentAsync(entity);
        }

        public async Task DeleteCommentAsync(Guid commentId)
        {
            await _playlistCommentRepository.DeleteCommentAsync(commentId);
        }

        private async Task<SinglePlaylistDto> MapPlaylistEntityToSinglePlaylistDto(Playlist entity)
        {
            var mappedComments =
                _mapper.Map<IEnumerable<PlaylistComment>, IEnumerable<PlaylistCommentDetailsDto>>(entity.Comments);
            var mappedMetronomeSettings = await _metronomeSettingsInPlaylistService.GetAllSettingsInPlaylistAsync(entity.Id);

            var dto = new SinglePlaylistDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                MetronomeSettings = mappedMetronomeSettings,
                Comments = mappedComments,
                PositiveRaitingCount = entity.PositiveRaitingCount,
                NegativeRaitingCount = entity.NegativeRaitingCount
            };
            return dto;
        }
    }
}
