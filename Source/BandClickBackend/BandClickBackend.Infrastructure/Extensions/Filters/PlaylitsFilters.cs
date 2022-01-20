using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Infrastructure.Extensions.Filters
{
    public static class PlaylitsFilters
    {
        public static IQueryable<Playlist> Filter(
            this IQueryable<Playlist> query,
            QueryFilters filters)
        {
            var searchLowered = filters.Search?.ToLower();
            query = query
                .Where(ms => filters.Search == null ||
                             ms.Name.ToLower().Contains(searchLowered));
            if (filters.OrderBy is not null)
            {
                switch (filters.OrderBy)
                {
                    case SortingTypes.Name:
                        query = filters.OrderByDirection is null || filters.OrderByDirection == SortingOrder.ASC
                            ? query.OrderBy(p => p.Name)
                            : query.OrderByDescending(p => p.Name);
                        break;
                    case SortingTypes.Author:
                        query = filters.OrderByDirection is null || filters.OrderByDirection == SortingOrder.ASC
                            ? query.OrderBy(p => p.CreatedBy.Username)
                            : query.OrderByDescending(p => p.CreatedBy.Username);
                        break;
                    case SortingTypes.Date:
                        query = filters.OrderByDirection is null || filters.OrderByDirection == SortingOrder.ASC
                            ? query.OrderBy(p => p.Created)
                            : query.OrderByDescending(p => p.Created);
                        break;
                    default:
                        break;
                }
            }
            return query;
        }

        public static IQueryable<Playlist> Paginate(
            this IQueryable<Playlist> query,
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
