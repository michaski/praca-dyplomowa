using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Playlist;

namespace BandClickBackend.Application.Interfaces
{
    public interface IPlaylistService
    {
        Task<IEnumerable<PlaylistListDto>> GetAllPlaylistsForUser();
        Task<IEnumerable<PlaylistListDto>> GetAllSharedPlaylists();
        Task<SinglePlaylistDto> GetPlaylistById(Guid id);
        Task<SinglePlaylistDto> AddPlaylist(CreatePlaylistDto playlist);
        Task UpdatePlaylist(EditPlaylistDto playlist);
        Task DeletePlaylist(Guid id);
    }
}
