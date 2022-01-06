using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Band;
using BandClickBackend.Application.Dtos.UserInBands;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IBandService
    {
        Task<IEnumerable<BandListDto>> GetBandsWhereUserIsLeaderAsync();
        Task<IEnumerable<BandListDto>> GetAllBandsWhichUserBelongsToAsync();
        Task<BandDetailDto> GetBandByIdAsync(Guid id);
        Task<BandDetailDto> CreateAsync(string bandName);
        Task UpdateAsync(UpdateBandDto band);
        Task DeleteAsync(Guid bandId);
        Task DemoteLeaderAsync(UserBandRelationDto dto);
        Task AddMemberAsync(UserBandRelationDto dto);
        Task PromoteMemberAsync(UserBandRelationDto dto);
        Task RemoveUserFromBandAsync(UserBandRelationDto dto);
        Task<bool> IsUserBandLeaderAsync(Guid bandId);
        Task<bool> IsUserInBandAsync(Guid bandId);
        Task<bool> IsUserInBandWithAsync(Guid entityCreatedBy, Guid bandId);
        Task<bool> MetronomeSettingIsSharedInBandAsync(Guid settingId, Guid bandId);
    }
}
