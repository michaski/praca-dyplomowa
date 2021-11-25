using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface ISystemRoleRepository
    {
        SystemRole Admin { get; }
        SystemRole User { get; }
        Task<SystemRole> GetSystemRoleByNameAsync(string name);
    }
}
