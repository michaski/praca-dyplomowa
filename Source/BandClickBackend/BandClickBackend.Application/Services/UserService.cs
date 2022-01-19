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
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly ISystemRoleRepository _systemRoleRepository;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IMapper mapper, ISystemRoleRepository systemRoleRepository, IUserContextService userContextService)
        {
            _repository = repository;
            _mapper = mapper;
            _systemRoleRepository = systemRoleRepository;
            _userContextService = userContextService;
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

        public async Task UpdateUserAsync(SingleUserDto dto)
        {
            var entity = await _repository.GetUserByIdAsync(dto.Id);
            entity.Username = dto.Username;
            entity.Email = dto.Email;
            entity.SystemRole = await _systemRoleRepository.GetSystemRoleByNameAsync(dto.SystemRole);
            await _repository.UpdateUserAsync(entity);
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
    }
}
