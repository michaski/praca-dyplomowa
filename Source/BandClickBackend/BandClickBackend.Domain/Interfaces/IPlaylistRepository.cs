using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IPlaylistRepository
    {
        Task<IEnumerable<Playlist>> GetAllPlaylistsForUser();
        Task<IEnumerable<Playlist>> GetAllSharedPlaylists();
        Task<Playlist> GetPlaylistById(Guid id);
        Task<Playlist> AddPlaylist(Playlist playlist);
        Task UpdatePlaylist(Playlist playlist);
        Task DeletePlaylist(Playlist playlist);
    }
}
