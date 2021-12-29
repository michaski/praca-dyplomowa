using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IMetronomeSettingsInPlaylistService
    {
        Task<IEnumerable<MetronomeSettingsListDto>> GetAllSettingsInPlaylistAsync(Guid playlistId);
        Task<SingleMetronomeSettingDto> GetSettingInPlaylistByPositionAsync(Guid playlistId, int positionInPlaylist);
        Task AddMetronomeSettingToPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task ChangePositionInPlaylistAsync(Guid metronomeSettingId, Guid playlistId, int newPosition);
        Task RemoveMetronomeSettingFromPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
    }
}
