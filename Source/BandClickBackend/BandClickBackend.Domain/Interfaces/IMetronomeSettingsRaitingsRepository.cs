using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSettingsRaitingsRepository
    {
        Task<int> GetPositiveRaitingsCountAsync(Guid metronomeSettingId);
        Task<int> GetNegativeRaitingsCountAsync(Guid metronomeSettingId);
        Task<MetronomeSettingsRaiting> GetUserRaitingAsync(Guid metronomeSettingId);
        Task AddRaitingAsync(MetronomeSettingsRaiting raiting);
        Task RemoveRaitingAsync(MetronomeSettingsRaiting raiting);
        Task<bool> HasUserGivenRaitingAsync(Guid metronomeSettingId);
        Task<bool> IsUserRaitingPositiveAsync(Guid metronomeSettingId);
    }
}
