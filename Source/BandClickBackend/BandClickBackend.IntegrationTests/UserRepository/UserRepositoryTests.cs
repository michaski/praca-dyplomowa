using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;

namespace BandClickBackend.IntegrationTests.UserRepository
{
    public class UserRepositoryTests : IClassFixture<UserRepositoryTestBase>
    {
        private readonly UserRepositoryTestBase _base;
        private readonly Infrastructure.Repositories.UserRepository _sut;
        private readonly Mock<IUserContextService> _userContextServiceMock = new Mock<IUserContextService>();

        public UserRepositoryTests(UserRepositoryTestBase testBase)
        {
            _base = testBase;
            _sut = new Infrastructure.Repositories.UserRepository(_base.Context, _userContextServiceMock.Object);
        }

        [Fact]
        public void CreateUser_WithCorrectUserModel_CreatesNewUser()
        {
            User newUser = new User()
            {
                Id = Guid.NewGuid(),
                Username = "New User",
                Email = "newUser@mail.com",
                PasswordHash = ""
            };
            var userRole = _base.Context.SystemRoles.SingleOrDefault(r => r.Name == "User");
            var result = _sut.CreateUserAsync(newUser, userRole).Result;
            result.Should().NotBeNull();
            _base.Context.Users.SingleOrDefault(u => u.Id == newUser.Id).Should().NotBeNull();
        }

        [Fact]
        public void GetAll_WithEmptyDatabase_ReturnsEmptyCollection()
        {
            var result = _sut.GetAllAsync().Result;
            result.Should().BeEmpty();
        }
    }
}
