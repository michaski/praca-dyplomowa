using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Application.Dtos.UserInBands
{
    public class UserBandRelationDto
    {
        public string UserEmail { get; set; }
        public Guid BandId { get; set; }
    }
}
