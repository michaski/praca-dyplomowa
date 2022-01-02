using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSettingsCommentRepository
    {
        Task<MetronomeSettingsComment> GetByIdAsync(Guid id);
        Task<IEnumerable<MetronomeSettingsComment>> GetSettingsCommentsAsync(Guid metronomeSettingId);
        Task<MetronomeSettingsComment> AddCommentAsync(MetronomeSettingsComment comment);
        Task EditCommentAsync(MetronomeSettingsComment comment);
        Task DeleteCommentAsync(Guid commentId);
    }
}
