using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Filters;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Application.Dtos.Raitings;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IMetronomeSettingsService
    {
        Task<PagedResult<MetronomeSettingsListDto>> GetAllAsync(QueryFilters filters);
        Task<SingleMetronomeSettingDto> GetByIdAsync(Guid id);
        Task<PagedResult<MetronomeSettingsListDto>> GetAllSharedAsync(QueryFilters filters);
        Task<IEnumerable<MetronomeSettingsListDto>> GetAllSettingsForUserAsync();
        Task<IEnumerable<MetronomeSettingsType>> GetAvailableSettingTypesAsync();
        Task<RaitingTypeDto> IsUserRaitingPositiveAsync(Guid settingId);
        Task<SingleMetronomeSettingDto> AddAsync(AddMetronomeSettingsDto entity);
        Task UpdateAsync(UpdateMetronomeSettingDto dto, Guid? bandId);
        Task ChangeTypeAsync(Guid settingId, Guid typeId);
        Task AddToPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task RemoveFromPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task ChangePositionInPlaylistAsync(Guid metronomeSettingId, Guid playlistId, int newPosition);
        Task MoveUpInPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task MoveDownInPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task AddPositiveRaitingAsync(Guid id);
        Task AddNegativeRaitingAsync(Guid id);
        Task RemoveUserRaitingAsync(Guid id);
        //Task RemoveNegativeRaitingAsync(Guid id);
        Task ShareInAppToggleAsync(Guid id);
        Task RemoveFromSharedInAppAsync(Guid id);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<MetronomeSettingsCommentDetailsDto>> GetAllCommentsAsync(Guid id);
        Task<MetronomeSettingsCommentDetailsDto> AddCommentAsync(AddMetronomeSettingsCommentDto comment);
        Task EditCommentAsync(UpdateMetronomeSettingsCommentDto comment);
        Task DeleteCommentAsync(Guid id);
    }
}
