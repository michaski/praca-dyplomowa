using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class UserInBandsRepository : IUserInBandsRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IBandRoleRepository _bandRoleRepository;
        private readonly IUserContextService _userContextService;

        public UserInBandsRepository(
            BandClickDbContext context, 
            IBandRoleRepository bandRoleRepository, 
            IUserContextService userContextService)
        {
            _context = context;
            _bandRoleRepository = bandRoleRepository;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<Band>> GetBandsWhereUserIsLeaderAsync()
        {
            var leaderId = _userContextService.UserId;
            return await _context.UsersInBands
                .Include(e => e.Band)
                .Where(e => e.MemberId == leaderId && e.BandRole == _bandRoleRepository.Leader)
                .Select(e => e.Band)
                .ToListAsync();
        }

        public async Task<IEnumerable<Band>> GetAllBandsWhichUserBelongsToAsync()
        {
            var memberId = _userContextService.UserId;
            return await _context.UsersInBands
                .Include(e => e.Band)
                .Where(e => e.MemberId == memberId)
                .Select(e => e.Band)
                .ToListAsync();
        }

        public async Task AddLeaderAsync(Guid bandId)
        {
            var newEntry = new UserInBands()
            {
                BandId = bandId,
                MemberId = (Guid)_userContextService.UserId,
                BandRole = _bandRoleRepository.Leader
            };
            _context.UsersInBands.Add(newEntry);
            await _context.SaveChangesAsync();
        }

        public async Task DemoteLeaderAsync(Guid bandId, Guid leaderId)
        {
            var entry = await _context.UsersInBands
                .SingleOrDefaultAsync(e => e.BandId == bandId && e.MemberId == leaderId);
            entry.BandRole = _bandRoleRepository.Member;
            _context.UsersInBands.Update(entry);
            await _context.SaveChangesAsync();
        }

        public async Task AddMemberAsync(Guid bandId, Guid memberId)
        {
            var newEntry = new UserInBands()
            {
                BandId = bandId,
                MemberId = memberId,
                BandRole = _bandRoleRepository.Member
            };
            _context.UsersInBands.Add(newEntry);
            await _context.SaveChangesAsync();
        }

        public async Task PromoteMemberAsync(Guid bandId, Guid memberId)
        {
            var entry = await _context.UsersInBands
                .SingleOrDefaultAsync(e => e.BandId == bandId && e.MemberId == memberId);
            entry.BandRole = _bandRoleRepository.Leader;
            _context.UsersInBands.Update(entry);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveUserFromBandAsync(Guid bandId, Guid memberId)
        {
            var entry = await _context.UsersInBands
                .SingleOrDefaultAsync(e => e.BandId == bandId && e.MemberId == memberId);
            if (entry.BandRole == _bandRoleRepository.Leader)
            {
                throw new ValidationException("Nie można usunąć lidera zespołu.");
            }
            _context.UsersInBands.Remove(entry);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsUserBandLeaderAsync(Guid bandId)
        {
            var entry = await _context.UsersInBands
                .Include(e => e.BandRole)
                .SingleOrDefaultAsync(e => e.MemberId == _userContextService.UserId && e.BandId == bandId);
            return entry != null && entry.BandRole == _bandRoleRepository.Leader;
        }

        public async Task<bool> IsOnlyBandLeaderAsync(Guid bandId)
        {
            var leaderCount = await _context.UsersInBands
                .Include(e => e.BandRole)
                .Where(e => e.BandId == bandId && e.BandRole == _bandRoleRepository.Leader)
                .CountAsync();
            return leaderCount == 1;
        }

        public async Task<bool> IsUserInBandAsync(Guid bandId)
        {
            var entry = await _context.UsersInBands
                .SingleOrDefaultAsync(e => e.MemberId == _userContextService.UserId && e.BandId == bandId);
            return entry != null;
        }

        public async Task<bool> UserIsInBandWithAsync(Guid entityCreatedBy, Guid bandId)
        {
            return await _context.UsersInBands
                .Where(e => e.BandId == bandId)
                .Select(e => e.MemberId == entityCreatedBy || e.MemberId == _userContextService.UserId)
                .CountAsync() == 2;
        }
    }
}
