using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Application.Dtos.Band
{
    public class UpdateBandDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
