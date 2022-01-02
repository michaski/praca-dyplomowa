using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BandClickBackend.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MetronomeSoundProviderController : ControllerBase
    {
        private readonly IMetronomeSoundService _service;

        public MetronomeSoundProviderController(IMetronomeSoundService service)
        {
            _service = service;
        }

        [HttpGet("accent")]
        [SwaggerOperation(Summary = "Downloads accented metronome sound")]
        public async Task<IActionResult> GetAccentedSound()
        {
            var fileInfo = await _service.GetAccentedMetronomeSoundAsync();
            if (fileInfo.FileContents == null)
            {
                return NotFound();
            }
            return File(fileInfo.FileContents, fileInfo.ContentType, fileInfo.FileName);
        }

        [HttpGet("regular")]
        [SwaggerOperation(Summary = "Downloads regular metronome sound")]
        public async Task<IActionResult> GetRegularSound()
        {
            var fileInfo = await _service.GetRegularMetronomeSoundAsync();
            if (fileInfo.FileContents == null)
            {
                return NotFound();
            }
            return File(fileInfo.FileContents, fileInfo.ContentType, fileInfo.FileName);
        }
    }
}
