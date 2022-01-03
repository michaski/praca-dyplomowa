using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.Auth;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Domain.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BandClickBackend.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserRepository _userRepository;
        private readonly ISystemRoleRepository _systemRoleRepository;
        private readonly IMapper _mapper;

        public AuthService(
            IPasswordHasher<User> passwordHasher, 
            IMapper mapper, 
            ISystemRoleRepository systemRoleRepository, 
            IUserRepository userRepository, 
            AuthenticationSettings authenticationSettings)
        {
            _passwordHasher = passwordHasher;
            _mapper = mapper;
            _systemRoleRepository = systemRoleRepository;
            _userRepository = userRepository;
            _authenticationSettings = authenticationSettings;
        }

        public async Task<SingleUserDto> RegisterUserAsync(RegisterUserDto user)
        {
            var newUser = _mapper.Map<RegisterUserDto, User>(user);
            var hashedPassword = _passwordHasher.HashPassword(newUser, user.Password);
            newUser.PasswordHash = hashedPassword;
            var createdUser = await _userRepository.CreateUserAsync(newUser, _systemRoleRepository.User);
            return _mapper.Map<User, SingleUserDto>(createdUser);
        }

        public async Task<TokenDto> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetUserByEmailAsync(dto.Email);
            if (user is null)
            {
                return null;
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, $"{user.SystemRole.Name}")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: credentials);
            var tokenHandler = new JwtSecurityTokenHandler();
            return new TokenDto()
            {
                Token = tokenHandler.WriteToken(token)
            };
        }
    }
}
