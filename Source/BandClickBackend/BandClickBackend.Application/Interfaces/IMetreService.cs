using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IMetreService
    {
        Task UpdateAsync(UpdateMetreDto dto);
        Task<Metre> MapMetreDtoToMetreAsync(MetreViewDto dto);
        Task<Metre> MapMetreDtoToMetreAsync(UpdateMetreDto dto);
    }
}
