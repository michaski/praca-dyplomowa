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
    public class SystemRoleRepository : ISystemRoleRepository
    {
        public SystemRole Admin { get; }
        public SystemRole User { get; }
        private readonly BandClickDbContext _context;

        public SystemRoleRepository(BandClickDbContext context)
        {
            _context = context;
            Admin = _context.SystemRoles.SingleAsync(r => r.Name == "Admin").Result;
            User = _context.SystemRoles.SingleAsync(r => r.Name == "User").Result;
        }

        public async Task<SystemRole> GetSystemRoleByName(string name)
        {
            return await _context.SystemRoles.SingleOrDefaultAsync(r => r.Name == name);
        }
    }
}
