using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class RhythmicUnitRepository : IRhythmicUnitRepository
    {
        public RhythmicUnit QuarterNote { get; }
        public RhythmicUnit EightNote { get; }
        public RhythmicUnit SixteenthNote { get; }
        private readonly BandClickDbContext _context;

        public RhythmicUnitRepository(BandClickDbContext context)
        {
            _context = context;
            QuarterNote = _context.RhythmicUnits.AsNoTracking().SingleOrDefaultAsync(ru => ru.NumericValue == 4).Result;
            EightNote = _context.RhythmicUnits.AsNoTracking().SingleOrDefaultAsync(ru => ru.NumericValue == 8).Result;
            SixteenthNote = _context.RhythmicUnits.AsNoTracking().SingleOrDefaultAsync(ru => ru.NumericValue == 16).Result;
        }
        
        public async Task<RhythmicUnit> GetRhythmicUnitByNumberAsync(int number)
        {
            return await _context.RhythmicUnits.SingleOrDefaultAsync(ru => ru.NumericValue == number);
        }

        public async Task<RhythmicUnit> GetRhythmicUnitByNameAsync(string name)
        {
            return await _context.RhythmicUnits.SingleOrDefaultAsync(ru => ru.DisplayName == name);
        }
    }
}
