using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IUserInBandsRepository
    {
        Task<IEnumerable<Band>> GetBandsWhereUserIsLeaderAsync();
        Task<IEnumerable<Band>> GetAllBandsWhichUserBelongsToAsync();
        Task AddLeaderAsync(Guid bandId);
        Task DemoteLeaderAsync(Guid bandId, Guid leaderId);
        Task AddMemberAsync(Guid bandId, Guid memberId);
        Task PromoteMemberAsync(Guid bandId, Guid memberId);
        Task RemoveUserFromBandAsync(Guid bandId, Guid memberId);
        Task<bool> IsUserBandLeaderAsync(Guid bandId);
        Task<bool> IsUserInBandAsync(Guid bandId);
        Task<bool> IsOnlyBandLeaderAsync(Guid bandId);
        Task<bool> UserIsInBandWithAsync(Guid entityCreatedBy, Guid bandId);
    }
}
