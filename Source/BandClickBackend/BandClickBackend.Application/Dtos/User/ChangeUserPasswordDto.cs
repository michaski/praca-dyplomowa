using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Application.Dtos.User
{
    public class ChangeUserPasswordDto
    {
        public Guid Id { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
