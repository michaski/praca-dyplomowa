using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IPlaylistRepository
    {
        Task<IEnumerable<Playlist>> GetAllPlaylistsForUserAsync();
        Task<ResultPage<Playlist>> GetAllSharedPlaylistsAsync(QueryFilters filters);
        Task<Playlist> GetPlaylistByIdAsync(Guid id);
        Task<Playlist> AddPlaylistAsync(Playlist playlist);
        Task UpdatePlaylistAsync(Playlist playlist);
        Task ShareInAppToggleAsync(Playlist playlist);
        Task DeletePlaylistAsync(Playlist playlist);
    }
}
