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
    public class MetronomeSettingsRaitingsRepository : IMetronomeSettingsRaitingsRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public MetronomeSettingsRaitingsRepository(BandClickDbContext context, IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<int> GetPositiveRaitingsCountAsync(Guid metronomeSettingId)
        {
            return await _context.MetronomeSettingsRaitings
                .Where(r => r.MetronomeSettingsId == metronomeSettingId && r.IsPositive)
                .CountAsync();
        }

        public async Task<int> GetNegativeRaitingsCountAsync(Guid metronomeSettingId)
        {
            return await _context.MetronomeSettingsRaitings
                .Where(r => r.MetronomeSettingsId == metronomeSettingId && !r.IsPositive)
                .CountAsync();
        }

        public async Task<MetronomeSettingsRaiting> GetUserRaitingAsync(Guid metronomeSettingId)
        {
            return await _context.MetronomeSettingsRaitings
                .SingleOrDefaultAsync(r => r.MetronomeSettingsId == metronomeSettingId &&
                                           r.UserId == _userContextService.UserId);
        }

        public async Task AddRaitingAsync(MetronomeSettingsRaiting raiting)
        {
            _context.MetronomeSettingsRaitings.Add(raiting);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveRaitingAsync(MetronomeSettingsRaiting raiting)
        {
            _context.MetronomeSettingsRaitings.Remove(raiting);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> HasUserGivenRaitingAsync(Guid metronomeSettingId)
        {
            return await _context.MetronomeSettingsRaitings
                    .SingleOrDefaultAsync(r => r.MetronomeSettingsId == metronomeSettingId &&
                                               r.UserId == _userContextService.UserId)
                is not null;
        }

        public async Task<bool> IsUserRaitingPositiveAsync(Guid metronomeSettingId)
        {
            return await _context.MetronomeSettingsRaitings
                .Where(r => r.MetronomeSettingsId == metronomeSettingId && r.UserId == _userContextService.UserId)
                .Select(r => r.IsPositive)
                .FirstAsync();
        }
    }
}
