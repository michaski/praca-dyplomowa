using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace BandClickBackend.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IUserRepository _userRepository;
        private readonly ISystemRoleRepository _systemRoleRepository;
        private readonly IMapper _mapper;

        public AuthService(IPasswordHasher<User> passwordHasher, IMapper mapper, ISystemRoleRepository systemRoleRepository, IUserRepository userRepository)
        {
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _systemRoleRepository = systemRoleRepository;
            _userRepository = userRepository;
        }

        public async Task<SingleUserDto> RegisterUser(RegisterUserDto user)
        {
            var newUser = _mapper.Map<RegisterUserDto, User>(user);
            var hashedPassword = _passwordHasher.HashPassword(newUser, user.Password);
            newUser.PasswordHash = hashedPassword;
            var createdUser = await _userRepository.CreateUserAsync(newUser, _systemRoleRepository.User);
            return _mapper.Map<User, SingleUserDto>(createdUser);
        }
    }
}
