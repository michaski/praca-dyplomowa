using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Filters;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using BandClickBackend.Infrastructure.Extensions.Filters;
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

        public async Task<ResultPage<MetronomeSettings>> GetAllAsync(QueryFilters filters)
        {
            var filteredQuery = _context.MetronomeSettings
                .Include(ms => ms.Metre)
                .ThenInclude(m => m.AccentedBeats)
                .Include(ms => ms.Metre.RhythmicUnit)
                .Include(ms => ms.Type)
                .Filter(filters);
            var resultPage = await filteredQuery
                .Paginate(filters)
                .ToListAsync();
            return new ResultPage<MetronomeSettings>(resultPage, await filteredQuery.CountAsync());
        }

        public async Task<ResultPage<MetronomeSettings>> GetAllSharedAsync(QueryFilters filters)
        {
            var filteredQuery = _context.MetronomeSettings
                .Include(ms => ms.Metre)
                .ThenInclude(m => m.AccentedBeats)
                .Include(ms => ms.Metre.RhythmicUnit)
                .Include(ms => ms.Type)
                .Include(ms => ms.CreatedBy)
                .Include(ms => ms.Comments)
                .Where(x => x.IsShared)
                .Filter(filters);
            var resultPage = await filteredQuery
                .Paginate(filters)
                .ToListAsync();
            return new ResultPage<MetronomeSettings>(resultPage, await filteredQuery.CountAsync());
        }

        public async Task<IEnumerable<MetronomeSettings>> GetAllSettingsForUserAsync()
        {
            var user = await _context.Users
                .Include(u => u.MetronomeSettings)
                .ThenInclude(ms => ms.Metre)
                .ThenInclude(m => m.AccentedBeats)
                .Include(u => u.MetronomeSettings)
                .ThenInclude(ms => ms.Metre)
                .ThenInclude(m => m.RhythmicUnit)
                .Include(u => u.MetronomeSettings)
                .ThenInclude(ms => ms.Type)
                .SingleOrDefaultAsync(u => u.Id == _userContextService.UserId);
            return user.MetronomeSettings;
        }

        public async Task<MetronomeSettings> GetByIdAsync(Guid id)
        {
            return await _context.MetronomeSettings
                .Include(ms => ms.CreatedBy)
                .Include(ms => ms.Metre)
                .ThenInclude(m => m.AccentedBeats)
                .Include(ms => ms.Metre.RhythmicUnit)
                .Include(ms => ms.Type)
                .Include(ms => ms.Comments)
                .ThenInclude(c => c.CreatedBy)
                .SingleOrDefaultAsync(ms => ms.Id == id);
        }

        public async Task<MetronomeSettings> GetByIdNoTrackingAsync(Guid id)
        {
            return await _context.MetronomeSettings
                .AsNoTracking()
                .Include(ms => ms.Metre)
                .ThenInclude(m => m.AccentedBeats)
                .Include(ms => ms.Metre.RhythmicUnit)
                .Include(ms => ms.Type)
                .SingleOrDefaultAsync(ms => ms.Id == id);
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

        public async Task ShareInAppToggleAsync(MetronomeSettings metronomeSettings)
        {
            metronomeSettings.IsShared = !metronomeSettings.IsShared;
            await UpdateAsync(metronomeSettings);
        }

        public async Task DeleteAsync(MetronomeSettings metronomeSettings)
        {
            _context.MetronomeSettings.Remove(metronomeSettings);
            await _context.SaveChangesAsync();
        }
    }
}
