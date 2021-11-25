using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BandClickBackend.Application.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISystemRoleRepository _systemRoleRepository;

        public UserContextService(IHttpContextAccessor httpContextAccessor, ISystemRoleRepository systemRoleRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _systemRoleRepository = systemRoleRepository;
        }

        public ClaimsPrincipal User => _httpContextAccessor.HttpContext?.User;

        public Guid? UserId => User is null
            ? null
            : (Guid?)Guid.Parse(User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier).Value);

        public SystemRole SystemRole => User is null
            ? null
            : _systemRoleRepository.GetSystemRoleByNameAsync(
                User.FindFirst(c => c.Type == ClaimTypes.Role).Value).Result;

        public List<(Guid BandId, Guid BandRoleId)> UserBandRoles => User?.FindFirst(c => c.Type.ToString() == "BandRoles")?.Value
                .Split(Environment.NewLine)
                .Select(br => (Guid.Parse(br.Split(' ')[0]), Guid.Parse(br.Split(' ')[1])))
                .ToList();
    }
}
