using System;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetreRepository
    {
        Task<Metre> GetByIdAsync(Guid id);
        Task<Metre> GetByIdNoTrackingAsync(Guid id);
        Task<Metre> CreateAsync(Metre metre);
        Task UpdateAsync(Metre metre);
        Task DeleteAsync(Metre metre);
    }
}
