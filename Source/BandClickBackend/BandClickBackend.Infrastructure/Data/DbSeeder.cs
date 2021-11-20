using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Data
{
    public class DbSeeder
    {
        private readonly BandClickDbContext _context;

        public DbSeeder(BandClickDbContext context)
        {
            _context = context;
        }

        public void SeedDb()
        {
            var config = ConfigProvider.GetConfig();
            _context.Database.EnsureCreated();
            foreach (var systemRole in config.SystemRoles)
            {
                if (_context.SystemRoles.SingleOrDefault(r => r.Name == systemRole) is null)
                {
                    _context.SystemRoles.Add(new SystemRole()
                    {
                        Id = Guid.NewGuid(),
                        Name = systemRole
                    });
                }
            }
            if (_context.Users.SingleOrDefault(u => u.Id == config.SuperAdminId) is null)
            {
                User superAdmin = new User()
                {
                    Id = config.SuperAdminId,
                    Name = "Admin",
                    Email = "admin@bandclick.com",
                    SystemRole = _context.SystemRoles.SingleOrDefault(r => r.Name == "Admin")
                };
                _context.Users.Add(superAdmin);
            }
            foreach (var bandRole in config.BandRoles)
            {
                if (_context.BandRoles.SingleOrDefault(r => r.Name == bandRole) is null)
                {
                    _context.BandRoles.Add(new BandRole()
                    {
                        Id = Guid.NewGuid(),
                        Name = bandRole
                    });
                }
            }
            foreach (var metronomeSettingsType in config.MetronomeSettingsTypes)
            {
                if (_context.MetronomeSettingsTypes.SingleOrDefault(s => s.Name == metronomeSettingsType) is null)
                {
                    _context.MetronomeSettingsTypes.Add(new MetronomeSettingsType()
                    {
                        Id = Guid.NewGuid(),
                        Name = metronomeSettingsType
                    });
                }
            }
            for (int i = 0; i < config.RhythmicUnits.Count; i++)
            {
                if (_context.RhythmicUnits.SingleOrDefault(u => u.NumericValue == config.RhythmicUnits[i]) is null)
                {
                    _context.RhythmicUnits.Add(new RhythmicUnit()
                    {
                        Id = Guid.NewGuid(),
                        NumericValue = config.RhythmicUnits[i],
                        DisplayName = config.RhythmicUnitsNames[i]
                    });
                }
            }
            _context.SaveChanges();
        }
    }
}
