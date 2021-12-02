using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace BandClickBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MetronomeSettingsController : ControllerBase
    {
        private readonly IMetronomeSettingsService _metronomeSettingsService;

        public MetronomeSettingsController(IMetronomeSettingsService metronomeSettingsService)
        {
            _metronomeSettingsService = metronomeSettingsService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Gets all metronome settings")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _metronomeSettingsService.GetAllAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Gets metronome setting with specified id")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _metronomeSettingsService.GetByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("shared")]
        [SwaggerOperation(Summary = "Gets all shared metronome settings")]
        public async Task<IActionResult> GetAllShared()
        {
            var result = await _metronomeSettingsService.GetAllSharedAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("userCreated")]
        [SwaggerOperation(Summary = "Gets metronome settings created by logged user")]
        public async Task<IActionResult> GetAllForUser()
        {
            var result = await _metronomeSettingsService.GetAllSettingsForUserAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Creates new metronome setting")]
        public async Task<IActionResult> Create(AddMetronomeSettingsDto dto)
        {
            var result = await _metronomeSettingsService.AddAsync(dto);
            if (result is null)
            {
                return BadRequest();
            }
            return Created($"{result.Id}", result);
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Updates metronome setting's data")]
        public async Task<IActionResult> Update(SingleMetronomeSettingDto dto)
        {
            await _metronomeSettingsService.UpdateAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deletes metronome setting")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _metronomeSettingsService.DeleteAsync(id);
            return NoContent();
        }
    }
}
