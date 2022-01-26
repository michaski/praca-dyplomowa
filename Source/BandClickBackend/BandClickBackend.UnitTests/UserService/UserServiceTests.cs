using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Services;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using Xunit;

namespace BandClickBackend.UnitTests.UserService
{
    public class UserServiceTests
    {
        private readonly Application.Services.UserService _sut;
        private Mock<UserRepository> _userRepositoryMock = new Mock<UserRepository>();
        private Mock<SystemRoleRepository> _systemRoleRepositoryMock = new Mock<SystemRoleRepository>();
        private Mock<UserContextService> _userContextServiceMock = new Mock<UserContextService>();
        private Mock<IPasswordHasher<User>> _passwordHasherMock = new Mock<IPasswordHasher<User>>();
        private Mock<Mapper> _mapperMock = new Mock<Mapper>();

        private User TestUserData = new User()
        {
            Username = "User Resu",
            Email = "user@mail.com"
        };

        public UserServiceTests()
        {
            _systemRoleRepositoryMock.Setup(x => x.User)
                .Returns(new SystemRole()
                {
                    Id = Guid.NewGuid(),
                    Name = "User"
                });
            User createdUser = new User()
            {
                Id = Guid.NewGuid(),
                Username = TestUserData.Username,
                Email = TestUserData.Email
            };
            _userRepositoryMock
                .Setup(x => x.CreateUserAsync(It.IsAny<User>(), It.Is<SystemRole>(x => x.Name == "User")))
                .ReturnsAsync(createdUser);
            _mapperMock.Setup(x => x.Map<RegisterUserDto, User>(It.IsAny<RegisterUserDto>()))
                .Returns(TestUserData);
            _sut = new Application.Services.UserService(_userRepositoryMock.Object, _mapperMock.Object, _systemRoleRepositoryMock.Object, _userContextServiceMock.Object, _passwordHasherMock.Object);
        }
    }
}
