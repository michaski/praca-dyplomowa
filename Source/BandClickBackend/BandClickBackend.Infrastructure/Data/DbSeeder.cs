using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Data
{
    public class DbSeeder
    {
        private readonly BandClickDbContext _context;
        private IPasswordHasher<User> _passwordHasher;

        public DbSeeder(BandClickDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public void SeedDb()
        {
            var config = ConfigProvider.GetConfig();
            var createdSuperAdmin = false;
            _context.Database.EnsureCreated();
            foreach (var systemRole in config.SystemRoles)
            {
                if (_context.SystemRoles.SingleOrDefault(r => r.Name == systemRole) is null)
                {
                    _context.SystemRoles.Add(new SystemRole()
                    {
                        Name = systemRole
                    });
                }
            }
            if (_context.Users.SingleOrDefault(u => u.Id == config.SuperAdmin.Id) is null)
            {
                User superAdmin = new User()
                {
                    Username = "Super Admin",
                    Email = "admin@bandclick.com",
                    SystemRole = _context.SystemRoles.SingleOrDefault(r => r.Name == "Admin")
                };
                var hashedPassword = _passwordHasher.HashPassword(superAdmin, config.SuperAdmin.Password);
                superAdmin.PasswordHash = hashedPassword;
                _context.Users.Add(superAdmin);
                createdSuperAdmin = true;
            }
            foreach (var bandRole in config.BandRoles)
            {
                if (_context.BandRoles.SingleOrDefault(r => r.Name == bandRole) is null)
                {
                    _context.BandRoles.Add(new BandRole()
                    {
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
                        NumericValue = config.RhythmicUnits[i],
                        DisplayName = config.RhythmicUnitsNames[i]
                    });
                }
            }
            _context.SaveChanges();
            if (createdSuperAdmin)
            {
                ConfigProvider.SaveSuperAdminId(_context.Users.SingleOrDefault(u => u.Username == "Super Admin").Id);
            }
        }
    }
}
