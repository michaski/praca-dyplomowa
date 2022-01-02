using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BandClickBackend.Application.Dtos.Files
{
    public class FileDto
    {
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public byte[] FileContents { get; set; }
    }
}
