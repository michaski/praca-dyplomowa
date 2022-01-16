using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Exceptions;
using BandClickBackend.Domain.Interfaces;

namespace BandClickBackend.Application.Services
{
    public class MetronomeSettingsInPlaylistService : IMetronomeSettingsInPlaylistService
    {
        private readonly IMetronomeSettingsInPlaylistRepository _metronomeSettingsInPlaylistRepository;
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IMetronomeSettingsRepository _metronomeSettingsRepository;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;

        public MetronomeSettingsInPlaylistService(
            IMetronomeSettingsInPlaylistRepository metronomeSettingsInPlaylistRepository,
            IMapper mapper,
            IPlaylistRepository playlistRepository,
            IMetronomeSettingsRepository metronomeSettingsRepository,
            IUserContextService userContextService)
        {
            _metronomeSettingsInPlaylistRepository = metronomeSettingsInPlaylistRepository;
            _mapper = mapper;
            _playlistRepository = playlistRepository;
            _metronomeSettingsRepository = metronomeSettingsRepository;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<MetronomeSettingsListDto>> GetAllSettingsInPlaylistAsync(Guid playlistId)
        {
            var playlist = await _playlistRepository.GetPlaylistByIdAsync(playlistId);
            return _mapper.Map<IEnumerable<MetronomeSettings>, IEnumerable<MetronomeSettingsListDto>>(
                await _metronomeSettingsInPlaylistRepository.GetAllSettingsInPlaylistAsync(
                    playlist));
        }

        public async Task<SingleMetronomeSettingDto> GetSettingInPlaylistByPositionAsync(Guid playlistId, int positionInPlaylist)
        {
            var playlist = await _playlistRepository.GetPlaylistByIdAsync(playlistId);
            var result = await _metronomeSettingsInPlaylistRepository.GetSettingInPlaylistByPositionAsync(
                playlist, positionInPlaylist);
            return _mapper.Map<MetronomeSettings, SingleMetronomeSettingDto>(
                result.MetronomeSettings);
        }

        public async Task AddMetronomeSettingToPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            var playlist = await _playlistRepository.GetPlaylistByIdAsync(playlistId);
            if (!_userContextService.IsEntityCreator(playlist))
            {
                throw new UserNotAllowedException("Tylko twórca playlisty może nią zarządzać.");
            }
            var playlistLength = await _metronomeSettingsInPlaylistRepository.GetPlaylistLengthAsync(playlist);
            var newEntity = new MetronomeSettingsInPlaylist()
            {
                MetronomeSettingsId = metronomeSettingId,
                PlaylistId = playlistId,
                PositionInPlaylist = playlistLength + 1
            };
            await _metronomeSettingsInPlaylistRepository.AddMetronomeSettingToPlaylistAsync(newEntity);
        }

        public async Task ChangePositionInPlaylistAsync(Guid metronomeSettingId, Guid playlistId, int newPosition)
        {
            var playlist = await _playlistRepository.GetPlaylistByIdAsync(playlistId);
            if (!_userContextService.IsEntityCreator(playlist))
            {
                throw new UserNotAllowedException("Tylko twórca playlisty może nią zarządzać.");
            }
            var entryToMove = await _metronomeSettingsInPlaylistRepository
                .GetEntryBySettingAndPlaylistIdAsync(metronomeSettingId, playlistId);
            var entriesToShift = new List<MetronomeSettingsInPlaylist>();
            if (newPosition > entryToMove.PositionInPlaylist)
            {
                entriesToShift = await _metronomeSettingsInPlaylistRepository
                    .GetEntriesRangeByPositionAsync(
                        entryToMove.PositionInPlaylist + 1,
                        newPosition) as List<MetronomeSettingsInPlaylist>;
                foreach (var entry in entriesToShift)
                {
                    entry.PositionInPlaylist--;
                }
            }
            else if (newPosition < entryToMove.PositionInPlaylist)
            {
                entriesToShift = await _metronomeSettingsInPlaylistRepository
                    .GetEntriesRangeByPositionAsync(
                        newPosition,
                        entryToMove.PositionInPlaylist - 1) as List<MetronomeSettingsInPlaylist>;
                foreach (var entry in entriesToShift)
                {
                    entry.PositionInPlaylist++;
                }
            }
            entryToMove.PositionInPlaylist = newPosition;
            await _metronomeSettingsInPlaylistRepository.ChangePositionInPlaylistAsync(entryToMove, entriesToShift);
        }

        public async Task MoveUpInPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            var entryToMove = await _metronomeSettingsInPlaylistRepository
                .GetEntryBySettingAndPlaylistIdAsync(metronomeSettingId, playlistId);
            if (entryToMove.PositionInPlaylist <= 1)
            {
                return;
            }
            var entryAbove = await _metronomeSettingsInPlaylistRepository
                .GetEntryByPositionAsync(playlistId, entryToMove.PositionInPlaylist - 1);
            entryAbove.PositionInPlaylist++;
            entryToMove.PositionInPlaylist--;
            await _metronomeSettingsInPlaylistRepository.ChangePositionInPlaylistAsync(entryToMove, entryAbove);
        }

        public async Task MoveDownInPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            var entryToMove = await _metronomeSettingsInPlaylistRepository
                .GetEntryBySettingAndPlaylistIdAsync(metronomeSettingId, playlistId);
            var playlistLength =
                await _metronomeSettingsInPlaylistRepository.GetPlaylistLengthAsync(
                    await _playlistRepository.GetPlaylistByIdAsync(playlistId));
            if (entryToMove.PositionInPlaylist >= playlistLength)
            {
                return;
            }
            var entryBelow = await _metronomeSettingsInPlaylistRepository
                .GetEntryByPositionAsync(playlistId, entryToMove.PositionInPlaylist + 1);
            entryBelow.PositionInPlaylist--;
            entryToMove.PositionInPlaylist++;
            await _metronomeSettingsInPlaylistRepository.ChangePositionInPlaylistAsync(entryToMove, entryBelow);
        }

        public async Task RemoveMetronomeSettingFromPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            var playlist = await _playlistRepository.GetPlaylistByIdAsync(playlistId);
            if (!_userContextService.IsEntityCreator(playlist))
            {
                throw new UserNotAllowedException("Tylko twórca playlisty może nią zarządzać.");
            }
            var entryToDelete = await _metronomeSettingsInPlaylistRepository.GetEntryBySettingAndPlaylistIdAsync(
                metronomeSettingId, playlistId);
            var playlistLength =
                await _metronomeSettingsInPlaylistRepository.GetPlaylistLengthAsync(
                    await _playlistRepository.GetPlaylistByIdAsync(playlistId));
            var entriesToShift = await _metronomeSettingsInPlaylistRepository
                .GetEntriesRangeByPositionAsync(
                    entryToDelete.PositionInPlaylist + 1,
                    playlistLength) as List<MetronomeSettingsInPlaylist>;
            foreach (var entry in entriesToShift)
            {
                entry.PositionInPlaylist--;
            }
            await _metronomeSettingsInPlaylistRepository.RemoveMetronomeSettingFromPlaylistAsync(entryToDelete);
            await _metronomeSettingsInPlaylistRepository.UpdateAsync(entriesToShift);
        }
    }
}
