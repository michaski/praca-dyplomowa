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
            var typeLowered = filters.Type?.ToLower();
            query = query
                .Where(ms => filters.Type == null ||
                             ms.Type.Name.ToLower().Contains(typeLowered))
                .Where(ms => filters.Search == null ||
                             ms.Name.ToLower().Contains(searchLowered));
            if (filters.OrderBy is not null)
            {
                switch (filters.OrderBy)
                {
                    case SortingTypes.Name:
                        query = filters.OrderByDirection is null || filters.OrderByDirection == SortingOrder.ASC
                            ? query.OrderBy(ms => ms.Name)
                            : query.OrderByDescending(ms => ms.Name);
                        break;
                    case SortingTypes.Author:
                        query = filters.OrderByDirection is null || filters.OrderByDirection == SortingOrder.ASC
                            ? query.OrderBy(ms => ms.CreatedBy.Username)
                            : query.OrderByDescending(ms => ms.CreatedBy.Username);
                        break;
                    case SortingTypes.Date:
                        query = filters.OrderByDirection is null || filters.OrderByDirection == SortingOrder.ASC
                            ? query.OrderBy(ms => ms.Created)
                            : query.OrderByDescending(ms => ms.Created);
                        break;
                    default:
                        break;
                }
            }
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
