using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Domain.Common
{
    public class ResultPage<T>
    {
        public List<T> Results { get; set; }
        public int TotalItemsCount { get; set; }

        public ResultPage() { }

        public ResultPage(List<T> results, int totalItemsCount)
        {
            Results = results;
            TotalItemsCount = totalItemsCount;
        }
    }
}
