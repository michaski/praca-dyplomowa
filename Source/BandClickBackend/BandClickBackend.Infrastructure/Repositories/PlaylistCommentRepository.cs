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
    public class PlaylistCommentRepository : IPlaylistCommentRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public PlaylistCommentRepository(
            BandClickDbContext context, 
            IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<PlaylistComment> GetByIdAsync(Guid id)
        {
            return await _context.PlaylistsComments
                .SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<PlaylistComment>> GetPlaylistsCommentsAsync(Guid playlistId)
        {
            return await _context.PlaylistsComments
                .Where(e => e.PlaylistId == playlistId)
                .ToListAsync();
        }

        public async Task<PlaylistComment> AddCommentAsync(PlaylistComment comment)
        {
            _context.PlaylistsComments.Add(comment);
            await _context.SaveChangesSignInAsync(_userContextService);
            return comment;
        }

        public async Task EditCommentAsync(PlaylistComment comment)
        {
            _context.PlaylistsComments.Update(comment);
            await _context.SaveChangesSignInAsync(_userContextService);
        }

        public async Task DeleteCommentAsync(Guid commentId)
        {
            var entity = await _context.PlaylistsComments
                .SingleOrDefaultAsync(e => e.Id == commentId);
            _context.PlaylistsComments.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
