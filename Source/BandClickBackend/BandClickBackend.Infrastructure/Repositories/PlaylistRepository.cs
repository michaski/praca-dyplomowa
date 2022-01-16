using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using BandClickBackend.Infrastructure.Extensions.Filters;
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
            return user.Playlists.OrderBy(p => p.Name);
        }

        public async Task<ResultPage<Playlist>> GetAllSharedPlaylistsAsync(QueryFilters filters)
        {
            var filteredQuery = _context.Playlists
                .Where(p => p.IsShared)
                .Filter(filters);
            var resultPage = await filteredQuery
                .Paginate(filters)
                .ToListAsync();
            return new ResultPage<Playlist>(resultPage, await filteredQuery.CountAsync());
        }

        public async Task<Playlist> GetPlaylistByIdAsync(Guid id)
        {
            var entity = await _context.Playlists
                .Include(p => p.Comments)
                .Include(p => p.MetronomeSettings)
                .ThenInclude(e => e.MetronomeSettings)
                .ThenInclude(ms => ms.Metre)
                .ThenInclude(m => m.RhythmicUnit)
                .Include(p => p.MetronomeSettings)
                .ThenInclude(e => e.MetronomeSettings)
                .ThenInclude(ms => ms.Metre)
                .ThenInclude(m => m.AccentedBeats)
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.Id == id);
            return entity;
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
            _context.Entry(playlist).State = EntityState.Modified;
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
