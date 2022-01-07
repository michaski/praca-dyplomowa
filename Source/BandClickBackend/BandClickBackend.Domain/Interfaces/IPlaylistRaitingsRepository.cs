using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IPlaylistRaitingsRepository
    {
        Task<int> GetPositiveRaitingsCountAsync(Guid playlistId);
        Task<int> GetNegativeRaitingsCountAsync(Guid playlistId);
        Task<PlaylistRaiting> GetUserRaitingAsync(Guid playlistId);
        Task AddRaitingAsync(PlaylistRaiting raiting);
        Task RemoveRaitingAsync(PlaylistRaiting raiting);
        Task<bool> HasUserGivenRaitingAsync(Guid playlistId);
        Task<bool> IsUserRaitingPositive(Guid playlistId);
    }
}
