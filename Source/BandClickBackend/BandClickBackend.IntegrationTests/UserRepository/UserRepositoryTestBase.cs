using System;
using System.Collections.Generic;
using System.Linq;
using BandClickBackend.Domain.Entities;
using BandClickBackend.IntegrationTests.Utils;

namespace BandClickBackend.IntegrationTests.UserRepository
{
    public class UserRepositoryTestBase : IntegrationTestBase
    {
        private List<SystemRole> _roles;
        private List<User> _users;

        public override void SeedDb()
        {
            _roles = new List<SystemRole>()
            {
                new SystemRole()
                {
                    Id = Guid.NewGuid(),
                    Name = "Admin"
                },
                new SystemRole()
                {
                    Id = Guid.NewGuid(),
                    Name = "User"
                }
            };
            Context.SystemRoles.AddRange(_roles);
            Context.SaveChanges();
            _users = new List<User>()
            {
                new User()
                {
                    Id = Guid.NewGuid(),
                    Username = "Admin",
                    SystemRole = Context.SystemRoles.SingleOrDefault(r => r.Name == "Admin"),
                    Email = "admin@bandclick.com"
                },
                new User()
                {
                    Id = Guid.NewGuid(),
                    Username = "User",
                    SystemRole = Context.SystemRoles.SingleOrDefault(r => r.Name == "User"),
                    Email = "user@mail.com"
                },
            };
            Context.Users.AddRange(_users);
            Context.SaveChanges();
        }
    }
}
