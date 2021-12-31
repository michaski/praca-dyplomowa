using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class PlaylistSharedInBandRepository : IPlaylistSharedInBandRepository
    {
        private readonly BandClickDbContext _context;

        public PlaylistSharedInBandRepository(BandClickDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Playlist>> GetPlaylistsSharedInBandAsync(Guid bandId)
        {
            return await _context.PlaylistsSharedInBands
                .Include(e => e.Playlist)
                .Where(e => e.BandId == bandId)
                .Select(e => e.Playlist)
                .ToListAsync();
        }

        public async Task SharePlaylistInBandAsync(Guid bandId, Guid playlistId)
        {
            var newEntry = new PlaylistsSharedInBand()
            {
                BandId = bandId,
                PlaylistId = playlistId
            };
            _context.PlaylistsSharedInBands.Add(newEntry);
            await _context.SaveChangesAsync();
        }

        public async Task RemovePlaylistFromBandAsync(Guid bandId, Guid playlistId)
        {
            var entry = await _context.PlaylistsSharedInBands
                .SingleOrDefaultAsync(e => e.BandId == bandId && e.PlaylistId == playlistId);
            _context.PlaylistsSharedInBands.Remove(entry);
            await _context.SaveChangesAsync();
        }
    }
}
