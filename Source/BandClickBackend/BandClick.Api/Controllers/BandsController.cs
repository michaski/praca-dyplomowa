using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Band;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Dtos.UserInBands;
using BandClickBackend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace BandClickBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BandsController : ControllerBase
    {
        private readonly IBandService _service;

        public BandsController(IBandService service)
        {
            _service = service;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Gets all bands, where user belongs")]
        public async Task<IActionResult> GetAllBandsWhichUserBelongsToAsync()
        {
            var result = await _service.GetAllBandsWhichUserBelongsToAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("userIsLeader")]
        [SwaggerOperation(Summary = "Gets all bands, where user is the leader")]
        public async Task<IActionResult> GetBandsWhereUserIsLeaderAsync()
        {
            var result = await _service.GetBandsWhereUserIsLeaderAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Gets band by id")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var result = await _service.GetBandByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("create/{name}")]
        [SwaggerOperation(Summary = "Creates new band and assigns user as band leader")]
        public async Task<IActionResult> CreateBandAsync([FromRoute] string name)
        {
            var result = await _service.CreateAsync(name);
            if (result is null)
            {
                return BadRequest();
            }
            return Created($"{result.Id}", result);
        }

        [HttpPut("editBandInfo")]
        [SwaggerOperation(Summary = "Edits band's info")]
        public async Task<IActionResult> UpdateBandAsync(UpdateBandDto dto)
        {
            if (!await _service.IsUserBandLeaderAsync(dto.Id))
            {
                return Forbid();
            }
            await _service.UpdateAsync(dto);
            return NoContent();
        }

        [HttpPost("addMember")]
        [SwaggerOperation(Summary = "Adds member to band")]
        public async Task<IActionResult> AddMemberAsync(UserBandRelationDto dto)
        {
            if (!await _service.IsUserBandLeaderAsync(dto.BandId))
            {
                return Forbid();
            }
            await _service.AddMemberAsync(dto);
            return NoContent();
        }

        [HttpPut("promoteMember")]
        [SwaggerOperation(Summary = "Promotes band member to band leader")]
        public async Task<IActionResult> PromoteMemberAsync(UserBandRelationDto dto)
        {
            if (!await _service.IsUserBandLeaderAsync(dto.BandId))
            {
                return Forbid();
            }
            await _service.PromoteMemberAsync(dto);
            return NoContent();
        }

        [HttpPut("demoteLeader")]
        [SwaggerOperation(Summary = "Demotes band leader to band member")]
        public async Task<IActionResult> DemoteMemberAsync(UserBandRelationDto dto)
        {
            if (!await _service.IsUserBandLeaderAsync(dto.BandId))
            {
                return Forbid();
            }
            await _service.DemoteLeaderAsync(dto);
            return NoContent();
        }

        [HttpDelete("removeMember")]
        [SwaggerOperation(Summary = "Removes member from band")]
        public async Task<IActionResult> RemoveUserFromBandAsync(UserBandRelationDto dto)
        {
            if (!await _service.IsUserBandLeaderAsync(dto.BandId))
            {
                return Forbid();
            }
            await _service.RemoveUserFromBandAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deletes band")]
        public async Task<IActionResult> DeleteBandAsync(Guid id)
        {
            if (!await _service.IsUserBandLeaderAsync(id))
            {
                return Forbid();
            }
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
