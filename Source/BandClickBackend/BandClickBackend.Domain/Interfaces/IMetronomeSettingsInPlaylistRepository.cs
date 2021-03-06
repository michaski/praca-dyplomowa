using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSettingsInPlaylistRepository
    {
        Task<IEnumerable<MetronomeSettings>> GetAllSettingsInPlaylistAsync(Playlist playlist);
        Task<MetronomeSettingsInPlaylist> GetSettingInPlaylistByPositionAsync(Playlist playlist, int positionInPlaylist);
        Task<IEnumerable<MetronomeSettingsInPlaylist>> GetEntriesRangeByPositionAsync(int startPosition, int endPosition);
        Task<MetronomeSettingsInPlaylist> GetEntryByPositionAsync(Guid playlistId, int position);
        Task<MetronomeSettingsInPlaylist> GetEntryBySettingAndPlaylistIdAsync(Guid metronomeSettingId, Guid playlistId);
        Task<int> GetPlaylistLengthAsync(Playlist playlist);
        Task AddMetronomeSettingToPlaylistAsync(MetronomeSettingsInPlaylist entry);
        Task UpdateAsync(IEnumerable<MetronomeSettingsInPlaylist> entries);
        Task ChangePositionInPlaylistAsync(MetronomeSettingsInPlaylist entryToMove, IEnumerable<MetronomeSettingsInPlaylist> entriesToShift);
        Task ChangePositionInPlaylistAsync(MetronomeSettingsInPlaylist entryToMove, MetronomeSettingsInPlaylist entryToShift);
        Task RemoveMetronomeSettingFromPlaylistAsync(MetronomeSettingsInPlaylist entry);
    }
}
