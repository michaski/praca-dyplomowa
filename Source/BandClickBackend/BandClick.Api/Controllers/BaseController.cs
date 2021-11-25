using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
using Swashbuckle.AspNetCore.Annotations;

namespace BandClickBackend.Api.Controllers
{
    public abstract class BaseController<T> : ControllerBase where T : BaseEntity
    {
        private readonly IBaseService<T> _service;

        public BaseController(IBaseService<T> service)
        {
            _service = service;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Gets all records")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _service.GetAllAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Gets record with given id")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Adds new record to database")]
        public async Task<IActionResult> AddAsync([FromBody] T entity)
        {
            var result = await _service.AddAsync(entity);
            return Created($"{entity.Id}", entity);
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Updates existing record in database")]
        public async Task<IActionResult> UpdateAsync([FromBody] T entity)
        {
            await _service.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deletes record from database based on its id")]
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
