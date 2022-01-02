using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class MetronomeSettingsInPlaylistRepository : IMetronomeSettingsInPlaylistRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public MetronomeSettingsInPlaylistRepository(BandClickDbContext context, IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<MetronomeSettings>> GetAllSettingsInPlaylistAsync(Playlist playlist)
        {
            return await _context.MetronomeSettingsInPlaylists
                .Include(e => e.MetronomeSettings)
                .Include(e => e.MetronomeSettings.Metre)
                .Include(e => e.MetronomeSettings.Type)
                .Where(e => e.PlaylistId == playlist.Id)
                .OrderBy(e => e.PositionInPlaylist)
                .Select(e => e.MetronomeSettings)
                .ToListAsync();
        }

        public async Task<MetronomeSettingsInPlaylist> GetSettingInPlaylistByPositionAsync(Playlist playlist, int positionInPlaylist)
        {
            return await _context.MetronomeSettingsInPlaylists
                .Include(e => e.MetronomeSettings)
                .Include(e => e.Playlist)
                .Where(e => e.PlaylistId == playlist.Id)
                .SingleOrDefaultAsync(e => e.PositionInPlaylist == positionInPlaylist);
        }

        public async Task<IEnumerable<MetronomeSettingsInPlaylist>> GetEntriesRangeByPositionAsync(int startPosition, int endPosition)
        {
            return await _context.MetronomeSettingsInPlaylists
                .Where(e =>
                    e.PositionInPlaylist >= startPosition || e.PositionInPlaylist <= endPosition)
                .ToListAsync();
        }

        public async Task<MetronomeSettingsInPlaylist> GetEntryBySettingAndPlaylistIdAsync(Guid metronomeSettingId, Guid playlistId)
        {
            return await _context.MetronomeSettingsInPlaylists
                .SingleOrDefaultAsync(e => 
                    e.MetronomeSettingsId == metronomeSettingId && e.PlaylistId == playlistId);
        }

        public async Task<int> GetPlaylistLengthAsync(Playlist playlist)
        {
            return await _context.MetronomeSettingsInPlaylists
                .Where(e => e.PlaylistId == playlist.Id)
                .CountAsync();
        }

        public async Task AddMetronomeSettingToPlaylistAsync(MetronomeSettingsInPlaylist entry)
        {
            _context.MetronomeSettingsInPlaylists.Add(entry);
            await _context.SaveChangesAsync();
        }

        public async Task ChangePositionInPlaylistAsync(MetronomeSettingsInPlaylist entryToMove, IEnumerable<MetronomeSettingsInPlaylist> entriesToShift)
        {
            _context.Update(entryToMove);
            _context.UpdateRange(entriesToShift);
            await _context.SaveChangesAsync();
        }

        public async Task TogglePlaylistSettingsInAppSharingAsync(Guid playlistId)
        {
            await _context.MetronomeSettingsInPlaylists
                .Include(e => e.MetronomeSettings)
                .Where(e => e.PlaylistId == playlistId)
                .ToListAsync();
            await _context.SaveChangesSignInAsync(_userContextService);
        }

        public async Task RemoveMetronomeSettingFromPlaylistAsync(MetronomeSettingsInPlaylist entry)
        {
            _context.MetronomeSettingsInPlaylists.Remove(entry);
            await _context.SaveChangesAsync();
        }
    }
}
