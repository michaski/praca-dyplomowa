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
    public class MetronomeSettingsRepository
        : RepositoryBase<MetronomeSettings>,
          IMetronomeSettingsRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public MetronomeSettingsRepository(BandClickDbContext context, IUserContextService userContextService)
            : base(context, userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<MetronomeSettings>> GetAllSharedAsync()
        {
            return await _context.MetronomeSettings
                .Where(x => x.IsShared)
                .ToListAsync();
        }

        public async Task<IEnumerable<MetronomeSettings>> GetAllSettingsForUserAsync()
        {
            var user = await _context.Users
                .Include(u => u.MetronomeSettings)
                .SingleOrDefaultAsync(u => u.Id == _userContextService.UserId);
            return user.MetronomeSettings;
        }

        public async Task<MetronomeSettings> CreateAsync(MetronomeSettings metronomeSettings)
        {
            _context.MetronomeSettings.Add(metronomeSettings);
            await _context.SaveChangesSignInAsync(_userContextService);
            return metronomeSettings;
        }
    }
}
