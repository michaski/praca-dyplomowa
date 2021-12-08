using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace BandClickBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MetreController : ControllerBase
    {
        private readonly IMetreService _service;

        public MetreController(IMetreService service)
        {
            _service = service;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMetre([FromBody] UpdateMetreDto dto)
        {
            await _service.UpdateAsync(dto);
            return NoContent();
        }
    }
}
