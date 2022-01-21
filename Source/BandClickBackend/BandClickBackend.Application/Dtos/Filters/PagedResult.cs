using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Application.Dtos.Filters
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public int TotalPages { get; set; }
        public int ItemsFrom { get; set; }
        public int ItemsTo { get; set; }
        public int TotalItemsCount { get; set; }

        public PagedResult(ResultPage<T> results, QueryFilters filters)
        {
            filters.Page ??= 1;
            filters.PageSize ??= results.TotalItemsCount;
            Items = results.Results;
            TotalItemsCount = results.TotalItemsCount;
            if (results.TotalItemsCount > 0)
            {
                ItemsFrom = filters.PageSize.Value * (filters.Page.Value - 1) + 1;
                ItemsTo = ItemsFrom + filters.PageSize.Value - 1;
                TotalPages = (int)Math.Ceiling(results.TotalItemsCount / (double)filters.PageSize);
            }
            else
            {
                ItemsFrom = 0;
                ItemsTo = 0;
                TotalPages = 0;
            }
        }

        public PagedResult(List<T> items, int totalItemsCount, int pageSize, int pageNumber)
        {
            Items = items;
            TotalItemsCount = totalItemsCount;
            ItemsFrom = pageSize * (pageNumber - 1) + 1;
            ItemsTo = ItemsFrom + pageSize - 1;
            TotalPages = (int)Math.Ceiling(totalItemsCount / (double)pageSize);
        }
    }
}
