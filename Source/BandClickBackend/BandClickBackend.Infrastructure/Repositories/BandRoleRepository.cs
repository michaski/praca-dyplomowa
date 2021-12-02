using System;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class BandRoleRepository : IBandRoleRepository
    {
        public BandRole Leader { get; }
        public BandRole Member { get; }
        private readonly BandClickDbContext _context;

        public BandRoleRepository(BandClickDbContext context)
        {
            _context = context;
            Leader = _context.BandRoles.SingleOrDefaultAsync(br => br.Name == "Leader").Result;
            Member = _context.BandRoles.SingleOrDefaultAsync(br => br.Name == "Member").Result;
        }

        public async Task<BandRole> GetBandRoleByNameAsync(string name)
        {
            return await _context.BandRoles.SingleOrDefaultAsync(br => br.Name == name);
        }

        public async Task<BandRole> GetBandRoleByIdAsync(Guid id)
        {
            return await _context.BandRoles.SingleOrDefaultAsync(br => br.Id == id);
        }
    }
}
