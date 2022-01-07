using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Domain.Common
{
    public class QueryFilters
    {
        public string Search { get; set; }
        public int? Page { get; set; }
        public int? PageSize { get; set; }
    }
}
