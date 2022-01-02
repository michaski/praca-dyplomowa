using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Files;

namespace BandClickBackend.Application.Interfaces
{
    public interface IMetronomeSoundService
    {
        Task<FileDto> GetAccentedMetronomeSoundAsync();
        Task<FileDto> GetRegularMetronomeSoundAsync();
    }
}
