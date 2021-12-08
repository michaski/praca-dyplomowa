using System;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class MetreRepository : IMetreRepository
    {
        private readonly BandClickDbContext _context;

        public MetreRepository(BandClickDbContext context)
        {
            _context = context;
        }

        public async Task<Metre> GetByIdAsync(Guid id)
        {
            return await _context.Metres
                .Include(m => m.AccentedBeats)
                .Include(m => m.RhythmicUnit)
                .SingleOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Metre> GetByIdNoTrackingAsync(Guid id)
        {
            return await _context.Metres
                .AsNoTracking()
                .Include(m => m.AccentedBeats)
                .Include(m => m.RhythmicUnit)
                .SingleOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Metre> CreateAsync(Metre metre)
        {
            _context.Metres.Add(metre);
            await _context.SaveChangesAsync();
            return metre;
        }

        public async Task UpdateAsync(Metre metre)
        {
            _context.Metres.Update(metre);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Metre metre)
        {
            _context.Metres.Remove(metre);
            await _context.SaveChangesAsync();
        }
    }
}
