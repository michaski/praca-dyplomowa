using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IMetronomeSoundRepository
    {
        Task<FileData> GetAccentedMetronomeSoundAsync();
        Task<FileData> GetRegularMetronomeSoundAsync();
    }
}
