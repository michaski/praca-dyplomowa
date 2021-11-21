using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace BandClickBackend.Application.Mappings
{
    public interface IMap
    {
        void Mapping(Profile profile);
    }
}
