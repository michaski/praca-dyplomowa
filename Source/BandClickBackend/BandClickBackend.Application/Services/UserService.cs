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
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IMapper mapper, ISystemRoleRepository systemRoleRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _systemRoleRepository = systemRoleRepository;
        }
    }
}
