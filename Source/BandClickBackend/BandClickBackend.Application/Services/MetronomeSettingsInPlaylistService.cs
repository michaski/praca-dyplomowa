﻿using System;
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
    public class MetronomeSettingsInPlaylistService : IMetronomeSettingsInPlaylistService
    {
        private readonly IMetronomeSettingsInPlaylistRepository _metronomeSettingsInPlaylistRepository;
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IMetronomeSettingsRepository _metronomeSettingsRepository;
        private readonly IMapper _mapper;

        public MetronomeSettingsInPlaylistService(
            IMetronomeSettingsInPlaylistRepository metronomeSettingsInPlaylistRepository, 
            IMapper mapper, 
            IPlaylistRepository playlistRepository,
            IMetronomeSettingsRepository metronomeSettingsRepository)
        {
            _metronomeSettingsInPlaylistRepository = metronomeSettingsInPlaylistRepository;
            _mapper = mapper;
            _playlistRepository = playlistRepository;
            _metronomeSettingsRepository = metronomeSettingsRepository;
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

        public async Task RemoveMetronomeSettingFromPlaylistAsync(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsInPlaylistRepository.RemoveMetronomeSettingFromPlaylistAsync(
                await _metronomeSettingsInPlaylistRepository.GetEntryBySettingAndPlaylistIdAsync(
                    metronomeSettingId, playlistId));
        }
    }
}
