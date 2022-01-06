using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Domain.Exceptions
{
    public class UserNotAllowedException : Exception
    {
        public UserNotAllowedException()
        { }

        public UserNotAllowedException(string message)
            : base(message) { }
    }
}
