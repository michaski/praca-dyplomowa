using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IAccentedBeatsRepository
    {
        Task<IEnumerable<AccentedBeats>> GetAllAsync();
        Task<AccentedBeats> GetByIdAsync(Guid id);
        Task<AccentedBeats> AddAsync(AccentedBeats metronomeSettings);
        Task UpdateAsync(AccentedBeats metronomeSettings);
        Task DeleteAsync(AccentedBeats metronomeSettings);
    }
}
