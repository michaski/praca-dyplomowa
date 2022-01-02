using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Interfaces;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class MetronomeSoundRepository : IMetronomeSoundRepository
    {
        private readonly string BASE_PATH = 
            $"wwwroot{Path.DirectorySeparatorChar}media{Path.DirectorySeparatorChar}sounds{Path.DirectorySeparatorChar}metronome{Path.DirectorySeparatorChar}";

        public async Task<FileData> GetAccentedMetronomeSoundAsync()
        {
            var fileName = "accent.mp3";
            var filePath = $"{BASE_PATH}{fileName}";
            if (!File.Exists(filePath))
            {
                throw new ArgumentException($"Plik nie istnieje: \"{filePath}\".");
            }
            var fileData = new FileData()
            {
                FileName = fileName,
                FileContent = await File.ReadAllBytesAsync(filePath)
            };
            return fileData;
        }

        public async Task<FileData> GetRegularMetronomeSoundAsync()
        {
            var fileName = "regular.mp3";
            var filePath = $"{BASE_PATH}{fileName}";
            if (!File.Exists(filePath))
            {
                throw new ArgumentException($"Plik nie istnieje: \"{filePath}\".");
            }
            var fileData = new FileData()
            {
                FileName = fileName,
                FileContent = await File.ReadAllBytesAsync(filePath)
            };
            return fileData;
        }
    }
}
