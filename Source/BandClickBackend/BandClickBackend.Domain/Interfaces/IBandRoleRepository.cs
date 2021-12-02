using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IBandRoleRepository
    {
        BandRole Leader { get; }
        BandRole Member { get; }
        Task<BandRole> GetBandRoleByNameAsync(string name);
        Task<BandRole> GetBandRoleByIdAsync(Guid id);
    }
}
