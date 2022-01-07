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
    public class PlaylistRaitingsRepository : IPlaylistRaitingsRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public PlaylistRaitingsRepository(BandClickDbContext context, IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<int> GetPositiveRaitingsCountAsync(Guid playlistId)
        {
            return await _context.PlaylistRaitings
                .Where(r => r.PlaylistId == playlistId && r.IsPositive)
                .CountAsync();
        }

        public async Task<int> GetNegativeRaitingsCountAsync(Guid playlistId)
        {
            return await _context.PlaylistRaitings
                .Where(r => r.PlaylistId == playlistId && !r.IsPositive)
                .CountAsync();
        }

        public async Task<PlaylistRaiting> GetUserRaitingAsync(Guid playlistId)
        {
            return await _context.PlaylistRaitings
                .SingleOrDefaultAsync(r => r.PlaylistId == playlistId && 
                                                        r.UserId == _userContextService.UserId);
        }

        public async Task AddRaitingAsync(PlaylistRaiting raiting)
        {
            _context.PlaylistRaitings.Add(raiting);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveRaitingAsync(PlaylistRaiting raiting)
        {
            _context.PlaylistRaitings.Remove(raiting);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> HasUserGivenRaitingAsync(Guid playlistId)
        {
            return await _context.PlaylistRaitings
                .SingleOrDefaultAsync(r => r.PlaylistId == playlistId &&
                                                        r.UserId == _userContextService.UserId) 
                is not null;
        }

        public async Task<bool> IsUserRaitingPositive(Guid playlistId)
        {
            return await _context.PlaylistRaitings
                .Where(r => r.PlaylistId == playlistId && r.UserId == _userContextService.UserId)
                .Select(r => r.IsPositive)
                .FirstAsync();
        }
    }
}
