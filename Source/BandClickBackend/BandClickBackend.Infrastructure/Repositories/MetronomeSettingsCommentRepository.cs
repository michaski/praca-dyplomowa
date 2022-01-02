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
    public class MetronomeSettingsCommentRepository : IMetronomeSettingsCommentRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public MetronomeSettingsCommentRepository(
            BandClickDbContext context, 
            IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<MetronomeSettingsComment> GetByIdAsync(Guid id)
        {
            return await _context.MetronomeSettingsComments
                .SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<MetronomeSettingsComment>> GetSettingsCommentsAsync(Guid metronomeSettingId)
        {
            return await _context.MetronomeSettingsComments
                .Where(e => e.MetronomeSettingsId == metronomeSettingId)
                .ToListAsync();
        }

        public async Task<MetronomeSettingsComment> AddCommentAsync(MetronomeSettingsComment comment)
        {
            _context.MetronomeSettingsComments.Add(comment);
            await _context.SaveChangesSignInAsync(_userContextService);
            return comment;
        }

        public async Task EditCommentAsync(MetronomeSettingsComment comment)
        {
            _context.MetronomeSettingsComments.Update(comment);
            await _context.SaveChangesSignInAsync(_userContextService);
        }

        public async Task DeleteCommentAsync(Guid commentId)
        {
            var entity = await _context.MetronomeSettingsComments
                .SingleOrDefaultAsync(e => e.Id == commentId);
            _context.MetronomeSettingsComments.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
