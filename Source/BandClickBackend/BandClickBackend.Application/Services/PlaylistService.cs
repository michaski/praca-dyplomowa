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

namespace BandClickBackend.Application.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _repository;
        private readonly IMetronomeSettingsRepository _metronomeSettingsRepository;
        private readonly IMapper _mapper;

        public PlaylistService(IPlaylistRepository repository, IMapper mapper, IMetronomeSettingsRepository metronomeSettingsRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _metronomeSettingsRepository = metronomeSettingsRepository;
        }

        public async Task<IEnumerable<PlaylistListDto>> GetAllPlaylistsForUser()
        {
            return _mapper.Map<IEnumerable<Playlist>, IEnumerable<PlaylistListDto>>(
                await _repository.GetAllPlaylistsForUser());
        }

        public async Task<IEnumerable<PlaylistListDto>> GetAllSharedPlaylists()
        {
            return _mapper.Map<IEnumerable<Playlist>, IEnumerable<PlaylistListDto>>(
                await _repository.GetAllSharedPlaylists());
        }

        public async Task<SinglePlaylistDto> GetPlaylistById(Guid id)
        {
            var entity = await _repository.GetPlaylistById(id);
            return await MapPlaylistEntityToSinglePlaylistDto(entity);
        }

        public async Task<SinglePlaylistDto> AddPlaylist(CreatePlaylistDto playlist)
        {
            var mappedPlaylist = _mapper.Map<CreatePlaylistDto, Playlist>(playlist);
            var result = await _repository.AddPlaylist(mappedPlaylist);
            return await MapPlaylistEntityToSinglePlaylistDto(result);
        }

        public async Task UpdatePlaylist(EditPlaylistDto playlist)
        {
            var entity = await _repository.GetPlaylistById(playlist.Id);
            entity.Name = playlist.Name;
            await _repository.UpdatePlaylist(entity);
        }

        public async Task DeletePlaylist(Guid id)
        {
            var entity = await _repository.GetPlaylistById(id);
            await _repository.DeletePlaylist(entity);
        }

        private async Task<SinglePlaylistDto> MapPlaylistEntityToSinglePlaylistDto(Playlist entity)
        {
            var mappedComments =
                _mapper.Map<IEnumerable<PlaylistComment>, IEnumerable<PlaylistCommentDto>>(entity.Comments);
            var mappedMetronomeSettings = new List<MetronomeSettingsListDto>();
            if (entity.MetronomeSettings is not null)
            {
                foreach (var metronomeSettingsInPlaylist in entity.MetronomeSettings)
                {
                    var metronomeSetting = await
                        _metronomeSettingsRepository.GetByIdAsync((metronomeSettingsInPlaylist.MetronomeSettingsId));
                    mappedMetronomeSettings.Add(
                        _mapper.Map<MetronomeSettings, MetronomeSettingsListDto>(metronomeSetting));
                }
            }

            var dto = new SinglePlaylistDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                MetronomeSettings = mappedMetronomeSettings,
                Comments = mappedComments
            };
            return dto;
        }
    }
}
