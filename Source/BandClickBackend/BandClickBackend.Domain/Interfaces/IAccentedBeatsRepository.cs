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
        Task<AccentedBeats> AddAsync(AccentedBeats accentedBeat);
        Task UpdateAsync(AccentedBeats accentedBeat);
        Task DeleteAsync(AccentedBeats accentedBeat);
    }
}
