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
    public class BandRepository : IBandRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IBandRoleRepository _bandRoleRepository;

        public BandRepository(
            BandClickDbContext context,
            IBandRoleRepository bandRoleRepository)
        {
            _context = context;
            _bandRoleRepository = bandRoleRepository;
        }

        public async Task<Band> GetBandByIdAsync(Guid id)
        {
            return await _context.Bands
                .Include(b => b.Playlists)
                .ThenInclude(p => p.Playlist)
                .ThenInclude(p => p.MetronomeSettings)
                .ThenInclude(ms => ms.MetronomeSettings)
                .ThenInclude(ms => ms.Metre)
                .ThenInclude(m => m.RhythmicUnit)
                .Include(b => b.Members)
                .ThenInclude(uib => uib.Member)
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Band> CreateAsync(Band band)
        {
            _context.Bands.Add(band);
            await _context.SaveChangesAsync();
            return band;
        }

        public async Task UpdateAsync(Band band)
        {
            _context.Bands.Update(band);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Band band)
        {
            _context.Bands.Remove(band);
            await _context.SaveChangesAsync();
        }
    }
}
