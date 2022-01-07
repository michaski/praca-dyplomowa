using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Filters;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Extensions.Filters
{
    public static class MetronomeSettingsFilters
    {
        public static IQueryable<MetronomeSettings> Filter(
            this IQueryable<MetronomeSettings> query,
            QueryFilters filters)
        {
            var searchLowered = filters.Search?.ToLower();
            query = query
                .Where(ms => filters.Search == null ||
                             ms.Name.ToLower().Contains(searchLowered));
            return query;
        }

        public static IQueryable<MetronomeSettings> Paginate(
            this IQueryable<MetronomeSettings> query,
            QueryFilters filters)
        {
            if (filters.Page.HasValue && filters.PageSize.HasValue)
            {
                query = query
                    .Skip(filters.PageSize.Value * (filters.Page.Value - 1))
                    .Take(filters.PageSize.Value);
            }
            return query;
        }
    }
}
