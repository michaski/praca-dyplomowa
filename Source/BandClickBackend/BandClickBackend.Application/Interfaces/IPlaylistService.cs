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
        Task<IEnumerable<PlaylistListDto>> GetAllPlaylistsForUserAsync();
        Task<IEnumerable<PlaylistListDto>> GetAllSharedPlaylistsAsync();
        Task<SinglePlaylistDto> GetPlaylistByIdAsync(Guid id);
        Task<SinglePlaylistDto> AddPlaylistAsync(CreatePlaylistDto playlist);
        Task UpdatePlaylistAsync(EditPlaylistDto playlist);
        Task ShareInAppToggleAsync(Guid id);
        Task ShareInBandAsync(Guid playlistId, Guid bandId);
        Task RemoveFromBandAsync(Guid playlistId, Guid bandId);
        Task DeletePlaylistAsync(Guid id);
    }
}
