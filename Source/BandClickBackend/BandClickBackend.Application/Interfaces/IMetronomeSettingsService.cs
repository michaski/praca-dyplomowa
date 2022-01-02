﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IMetronomeSettingsService
    {
        Task<IEnumerable<MetronomeSettingsListDto>> GetAllAsync();
        Task<SingleMetronomeSettingDto> GetByIdAsync(Guid id);
        Task<IEnumerable<MetronomeSettingsListDto>> GetAllSharedAsync();
        Task<IEnumerable<MetronomeSettingsListDto>> GetAllSettingsForUserAsync();
        Task<IEnumerable<MetronomeSettingsType>> GetAvailableSettingTypesAsync();
        Task<SingleMetronomeSettingDto> AddAsync(AddMetronomeSettingsDto entity);
        Task UpdateAsync(UpdateMetronomeSettingDto dto);
        Task ChangeTypeAsync(Guid settingId, Guid typeId);
        Task AddToPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task RemoveFromPlaylistAsync(Guid metronomeSettingId, Guid playlistId);
        Task ChangePositionInPlaylistAsync(Guid metronomeSettingId, Guid playlistId, int newPosition);
        Task AddPositiveRaitingAsync(Guid id);
        Task AddNegativeRaitingAsync(Guid id);
        Task RemovePositiveRaitingAsync(Guid id);
        Task RemoveNegativeRaitingAsync(Guid id);
        Task ShareInAppToggleAsync(Guid id);
        Task RemoveFromSharedInAppAsync(Guid id);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<MetronomeSettingsCommentDetailsDto>> GetAllCommentsAsync(Guid id);
        Task<MetronomeSettingsCommentDetailsDto> AddCommentAsync(AddMetronomeSettingsCommentDto comment);
        Task EditCommentAsync(UpdateMetronomeSettingsCommentDto comment);
        Task DeleteCommentAsync(Guid id);
    }
}
