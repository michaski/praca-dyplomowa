using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Exceptions;
using BandClickBackend.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace BandClickBackend.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly ISystemRoleRepository _systemRoleRepository;
        private readonly IUserContextService _userContextService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMapper _mapper;

        public UserService(
            IUserRepository repository,
            IMapper mapper,
            ISystemRoleRepository systemRoleRepository,
            IUserContextService userContextService, 
            IPasswordHasher<User> passwordHasher)
        {
            _repository = repository;
            _mapper = mapper;
            _systemRoleRepository = systemRoleRepository;
            _userContextService = userContextService;
            _passwordHasher = passwordHasher;
        }

        public async Task<SingleUserDto> GetUserByEmailAsync(string email)
        {
            return _mapper.Map<User, SingleUserDto>(
                await _repository.GetUserByEmailAsync(email));
        }

        public async Task<SingleUserDto> GetUserByUsernameAsync(string username)
        {
            return _mapper.Map<User, SingleUserDto>(
                await _repository.GetUserByUsernameAsync(username));
        }

        public async Task<SingleUserDto> GetUserByIdAsync(Guid id)
        {
            return _mapper.Map<User, SingleUserDto>(
                await _repository.GetUserByIdAsync(id));
        }

        public async Task UpdateUserAsync(UpdateUserDto dto)
        {
            var entity = await _repository.GetUserByIdAsync(dto.Id);
            entity.Username = dto.Username;
            entity.Email = dto.Email;
            await _repository.UpdateUserAsync(entity);
        }

        public async Task ChangePasswordAsync(ChangeUserPasswordDto dto)
        {
            var user = await _repository.GetUserByIdAsync(dto.Id);
            var hashedPassword = _passwordHasher.HashPassword(user, dto.NewPassword);
            user.PasswordHash = hashedPassword;
            await _repository.UpdateUserAsync(user);
        }

        public async Task PromoteUserToAdminAsync(Guid userId)
        {
            var entity = await _repository.GetUserByIdAsync(userId);
            entity.SystemRole = _systemRoleRepository.Admin;
            await _repository.UpdateUserAsync(entity);
        }

        public async Task DemoteAdminToUserAsync(Guid adminId)
        {
            var entity = await _repository.GetUserByIdAsync(adminId);
            entity.SystemRole = _systemRoleRepository.User;
            await _repository.UpdateUserAsync(entity);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            if (userId != _userContextService.UserId && !_userContextService.IsAdmin)
            {
                throw new UserNotAllowedException("Konto może usunąć tylko właściciel konta lub administrator.");
            }
            await _repository.DeleteUserAsync(await _repository.GetUserByIdAsync(userId));
        }
    }
}
