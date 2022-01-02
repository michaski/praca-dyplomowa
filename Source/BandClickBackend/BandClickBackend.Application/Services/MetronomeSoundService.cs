using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Files;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Interfaces;
using Microsoft.AspNetCore.StaticFiles;

namespace BandClickBackend.Application.Services
{
    public class MetronomeSoundService : IMetronomeSoundService
    {
        private readonly IMetronomeSoundRepository _repository;

        public MetronomeSoundService(IMetronomeSoundRepository repository)
        {
            _repository = repository;
        }

        public async Task<FileDto> GetAccentedMetronomeSoundAsync()
        {
            var fileData = await _repository.GetAccentedMetronomeSoundAsync();
            var contentProvider = new FileExtensionContentTypeProvider();
            contentProvider.TryGetContentType(fileData.FileName, out string contentType);
            var fileDto = new FileDto()
            {
                FileName = fileData.FileName,
                ContentType = contentType,
                FileContents = fileData.FileContent
            };
            return fileDto;
        }

        public async Task<FileDto> GetRegularMetronomeSoundAsync()
        {
            var fileData = await _repository.GetRegularMetronomeSoundAsync();
            var contentProvider = new FileExtensionContentTypeProvider();
            contentProvider.TryGetContentType(fileData.FileName, out string contentType);
            var fileDto = new FileDto()
            {
                FileName = fileData.FileName,
                ContentType = contentType,
                FileContents = fileData.FileContent
            };
            return fileDto;
        }
    }
}
