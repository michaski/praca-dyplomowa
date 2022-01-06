using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IPlaylistSharedInBandRepository
    {
        Task<IEnumerable<Playlist>> GetPlaylistsSharedInBandAsync(Guid bandId);
        Task SharePlaylistInBandAsync(Guid bandId, Guid playlistId);
        Task RemovePlaylistFromBandAsync(Guid bandId, Guid playlistId);
        Task<bool> MetronomeSettingIsSharedInBandAsync(Guid settingId, Guid bandId);
        Task<bool> IsPlaylistSharedInBandAsync(Guid playlistId, Guid bandId);
    }
}
