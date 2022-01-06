using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BandClickBackend.Application.Mappings;

namespace BandClickBackend.Application.Dtos.User
{
    public class UpdateUserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
