using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSettingsRepository
    {
        Task<IEnumerable<MetronomeSettings>> GetAllAsync();
        Task<IEnumerable<MetronomeSettings>> GetAllSharedAsync();
        Task<MetronomeSettings> GetByIdAsync(Guid id);
        Task<MetronomeSettings> CreateAsync(MetronomeSettings metronomeSettings);
        Task UpdateAsync(MetronomeSettings metronomeSettings);
        Task DeleteAsync(MetronomeSettings metronomeSettings);
    }
}
