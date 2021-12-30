using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IBandRepository
    {
        Task<Band> GetBandByIdAsync(Guid id);
        Task<Band> CreateAsync(Band band);
        Task UpdateAsync(Band band);
        Task DeleteAsync(Band band);
    }
}
