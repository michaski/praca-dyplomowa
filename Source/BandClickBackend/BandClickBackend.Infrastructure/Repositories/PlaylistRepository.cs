using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public PlaylistRepository(BandClickDbContext context, IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<Playlist>> GetAllPlaylistsForUserAsync()
        {
            var user = await _context.Users
                .Include(x => x.Playlists)
                .SingleOrDefaultAsync(u => u.Id == _userContextService.UserId);
            return user.Playlists;
        }

        public async Task<IEnumerable<Playlist>> GetAllSharedPlaylistsAsync()
        {
            return await _context.Playlists
                .Where(p => p.IsShared)
                .ToListAsync();
        }

        public async Task<Playlist> GetPlaylistByIdAsync(Guid id)
        {
            return await _context.Playlists
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Playlist> AddPlaylistAsync(Playlist playlist)
        {
            _context.Playlists.Add(playlist);
            await _context.SaveChangesSignInAsync(_userContextService);
            return await _context.Playlists
                .SingleOrDefaultAsync(p => p.Id == playlist.Id);
        }

        public async Task UpdatePlaylistAsync(Playlist playlist)
        {
            _context.Playlists.Update(playlist);
            await _context.SaveChangesSignInAsync(_userContextService);
        }

        public async Task ShareInAppToggleAsync(Playlist playlist)
        {
            playlist.IsShared = !playlist.IsShared;
            await UpdatePlaylistAsync(playlist);
        }

        public async Task DeletePlaylistAsync(Playlist playlist)
        {
            _context.Playlists.Remove(playlist);
            await _context.SaveChangesAsync();
        }
    }
}
