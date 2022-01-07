﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSettingsRepository
    {
        Task<ResultPage<MetronomeSettings>> GetAllAsync(QueryFilters filters);
        Task<ResultPage<MetronomeSettings>> GetAllSharedAsync(QueryFilters filters);
        Task<IEnumerable<MetronomeSettings>> GetAllSettingsForUserAsync();
        Task<MetronomeSettings> GetByIdAsync(Guid id);
        Task<MetronomeSettings> GetByIdNoTrackingAsync(Guid id);
        Task<MetronomeSettings> CreateAsync(MetronomeSettings metronomeSettings);
        Task UpdateAsync(MetronomeSettings metronomeSettings);
        Task ShareInAppToggleAsync(MetronomeSettings metronomeSettings);
        Task DeleteAsync(MetronomeSettings metronomeSettings);
    }
}
