using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSettingsTypeRepository
    {
        MetronomeSettingsType Song { get; }
        MetronomeSettingsType Exercise { get; }
        Task<MetronomeSettingsType> GetMetronomeSettingsTypeByName(string name);
        Task<MetronomeSettingsType> GetMetronomeSettingsTypeById(Guid id);
    }
}
