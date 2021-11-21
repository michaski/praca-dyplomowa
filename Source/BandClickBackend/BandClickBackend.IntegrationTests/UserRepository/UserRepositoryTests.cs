using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using FluentAssertions;
using Xunit;

namespace BandClickBackend.IntegrationTests.UserRepository
{
    public class UserRepositoryTests : IClassFixture<UserRepositoryTestBase>
    {
        private readonly UserRepositoryTestBase _base;
        private readonly Infrastructure.Repositories.UserRepository _sut;

        public UserRepositoryTests(UserRepositoryTestBase testBase)
        {
            _base = testBase;
            _sut = new Infrastructure.Repositories.UserRepository(_base.Context);
        }

        [Fact]
        public void CreateUser_WithCorrectUserModel_CreatesNewUser()
        {
            User newUser = new User()
            {
                Id = Guid.NewGuid(),
                Name = "New",
                Surname = "User",
                Email = "newUser@mail.com",
                PasswordHash = ""
            };
            var userRole = _base.Context.SystemRoles.SingleOrDefault(r => r.Name == "User");
            var result = _sut.CreateUserAsync(newUser, userRole).Result;
            result.Should().NotBeNull();
            _base.Context.Users.SingleOrDefault(u => u.Id == newUser.Id).Should().NotBeNull();
        }
    }
}
