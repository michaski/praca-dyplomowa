using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Domain.Exceptions
{
    public class ExceptionAsJson
    {
        public string ErrorMessage { get; set; }

        public ExceptionAsJson(Exception e)
        {
            ErrorMessage = e.Message;
        }

        public ExceptionAsJson(string message)
        {
            ErrorMessage = message;
        }
    }
}
