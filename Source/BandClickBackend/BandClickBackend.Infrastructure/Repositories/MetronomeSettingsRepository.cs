using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class MetronomeSettingsRepository : IMetronomeSettingsRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public MetronomeSettingsRepository(BandClickDbContext context, IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<MetronomeSettings>> GetAllAsync()
        {
            return await _context.MetronomeSettings.ToListAsync();
        }

        public async Task<IEnumerable<MetronomeSettings>> GetAllSharedAsync()
        {
            return await _context.MetronomeSettings
                .Where(x => x.IsShared)
                .ToListAsync();
        }

        public async Task<MetronomeSettings> GetByIdAsync(Guid id)
        {
            return await _context.MetronomeSettings.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<MetronomeSettings> CreateAsync(MetronomeSettings metronomeSettings)
        {
            _context.MetronomeSettings.Add(metronomeSettings);
            await _context.SaveChangesSignInAsync(_userContextService);
            return metronomeSettings;
        }

        public async Task UpdateAsync(MetronomeSettings metronomeSettings)
        {
            _context.MetronomeSettings.Update(metronomeSettings);
            await _context.SaveChangesSignInAsync(_userContextService);
        }

        public async Task DeleteAsync(MetronomeSettings metronomeSettings)
        {
            _context.MetronomeSettings.Remove(metronomeSettings);
            await _context.SaveChangesAsync();
        }
    }
}
