using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class MetronomeSettingsTypeRepository : IMetronomeSettingsTypeRepository
    {
        private readonly BandClickDbContext _context;
        public MetronomeSettingsType Song { get; }
        public MetronomeSettingsType Exercise { get; }

        public MetronomeSettingsTypeRepository(BandClickDbContext context)
        {
            _context = context;
            Song = _context.MetronomeSettingsTypes
                .AsNoTracking()
                .SingleOrDefaultAsync(mst => mst.Name == "Song").Result;
            Exercise = _context.MetronomeSettingsTypes
                .AsNoTracking()
                .SingleOrDefaultAsync(mst => mst.Name == "Exercise").Result;
        }

        public async Task<IEnumerable<MetronomeSettingsType>> GetAllMetronomeSettingsTypesAsync()
        {
            return await _context.MetronomeSettingsTypes
                .ToListAsync();
        }

        public async Task<MetronomeSettingsType> GetMetronomeSettingsTypeByName(string name)
        {
            return await _context.MetronomeSettingsTypes
                .AsNoTracking()
                .SingleOrDefaultAsync(mst => mst.Name == name);
        }

        public async Task<MetronomeSettingsType> GetMetronomeSettingsTypeById(Guid id)
        {
            return await _context.MetronomeSettingsTypes
                .SingleOrDefaultAsync(mst => mst.Id == id);
        }
    }
}
