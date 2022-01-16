using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Metre;
using BandClickBackend.Application.Dtos.MetronomeSettings;
using BandClickBackend.Application.Dtos.MetronomeSettingsComment;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
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
        public async Task<IActionResult> GetAllShared([FromQuery] QueryFilters filters)
        {
            var result = await _metronomeSettingsService.GetAllSharedAsync(filters);
            if (!result.Items.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("types")]
        [SwaggerOperation(Summary = "Gets available types for metronome settings")]
        public async Task<IActionResult> GetSettingTypes()
        {
            return Ok(await _metronomeSettingsService.GetAvailableSettingTypesAsync());
        }

        [HttpGet("{id}/raitings/user")]
        [SwaggerOperation(Summary =
            "Returns true if user has given positive raiting, false otherwise. If user hasn't given raiting, returns 404")]
        public async Task<IActionResult> GetUserRaitingTypeAsync(Guid id)
        {
            var result = await _metronomeSettingsService.IsUserRaitingPositiveAsync(id);
            if (result.IsPositive is null)
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

        [HttpPost("comments/add")]
        [SwaggerOperation(Summary = "Adds comment to shared metronome setting")]
        public async Task<IActionResult> AddComment(AddMetronomeSettingsCommentDto dto)
        {
            var comment = await _metronomeSettingsService.AddCommentAsync(dto);
            if (comment is null)
            {
                return BadRequest();
            }
            return Created($"comments/{comment.Id}", comment);
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Updates metronome setting's data")]
        public async Task<IActionResult> Update(UpdateMetronomeSettingDto dto, [FromQuery] Guid? bandId)
        {
            await _metronomeSettingsService.UpdateAsync(dto, bandId);
            return NoContent();
        }

        [HttpPut("{settingId}/changeType/{typeId}")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Changes metronome setting's type")]
        public async Task<IActionResult> ChangeSettingType(Guid settingId, Guid typeId)
        {
            await _metronomeSettingsService.ChangeTypeAsync(settingId, typeId);
            return NoContent();
        }

        [HttpPut("{id}/raitings/positive/add")]
        [SwaggerOperation(Summary = "Adds positive raiting to shared setting")]
        public async Task<IActionResult> AddPositiveRaiting(Guid id)
        {
            await _metronomeSettingsService.AddPositiveRaitingAsync(id);
            return NoContent();
        }
            
        //[HttpPut("{id}/raitings/positive/subtract")]
        //[SwaggerOperation(Summary = "Subtracts positive raiting from shared setting")]
        //public async Task<IActionResult> SubtractPositiveRaiting(Guid id)
        //{
        //    await _metronomeSettingsService.RemoveUserRaitingAsync(id);
        //    return NoContent();
        //}

        [HttpPut("{id}/raitings/negative/add")]
        [SwaggerOperation(Summary = "Adds negative raiting to shared setting")]
        public async Task<IActionResult> AddNegativeRaiting(Guid id)
        {
            await _metronomeSettingsService.AddNegativeRaitingAsync(id);
            return NoContent();
        }

        [HttpPut("{id}/raitings/remove")]
        [SwaggerOperation(Summary = "Removes user's raiting from shared setting")]
        public async Task<IActionResult> RemoveUserRaiting(Guid id)
        {
            await _metronomeSettingsService.RemoveUserRaitingAsync(id);
            return NoContent();
        }

        //[HttpPut("{id}/raitings/negative/subtract")]
        //[SwaggerOperation(Summary = "Subtracts negative raiting from shared setting")]
        //public async Task<IActionResult> SubtractNegativeRaiting(Guid id)
        //{
        //    await _metronomeSettingsService.RemoveNegativeRaitingAsync(id);
        //    return NoContent();
        //}

        [HttpPut("{metronomeSettingId}/addToPlaylist/{playlistId}")]
        [SwaggerOperation(Summary = "Adds metronome setting to playlist")]
        public async Task<IActionResult> AddToPlaylist(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsService.AddToPlaylistAsync(metronomeSettingId, playlistId);
            return NoContent();
        }

        [HttpPut("{metronomeSettingId}/removeFromPlaylist/{playlistId}")]
        [SwaggerOperation(Summary = "Removes metronome setting from playlist")]
        public async Task<IActionResult> RemoveFromPlaylist(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsService.RemoveFromPlaylistAsync(metronomeSettingId, playlistId);
            return NoContent();
        }

        [HttpPut("{metronomeSettingId}/changePositionInPlaylist/{playlistId}/{newPosition}")]
        [SwaggerOperation(Summary = "Changes metronome setting's position in playlist")]
        public async Task<IActionResult> ChangePositionInPlaylist(Guid metronomeSettingId, Guid playlistId, int newPosition)
        {
            await _metronomeSettingsService.ChangePositionInPlaylistAsync(metronomeSettingId, playlistId, newPosition);
            return NoContent();
        }

        [HttpPut("{metronomeSettingId}/moveUpInPlaylist/{playlistId}")]
        [SwaggerOperation(Summary = "Changes metronome setting's position in playlist")]
        public async Task<IActionResult> MoveUpInPlaylist(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsService.MoveUpInPlaylistAsync(metronomeSettingId, playlistId);
            return NoContent();
        }

        [HttpPut("{metronomeSettingId}/moveDownInPlaylist/{playlistId}")]
        [SwaggerOperation(Summary = "Changes metronome setting's position in playlist")]
        public async Task<IActionResult> MoveDownInPlaylist(Guid metronomeSettingId, Guid playlistId)
        {
            await _metronomeSettingsService.MoveDownInPlaylistAsync(metronomeSettingId, playlistId);
            return NoContent();
        }

        [HttpPut("shareInApp/{id}")]
        [SwaggerOperation(Summary = "Changes in app sharing for metronome setting with given id")]
        public async Task<IActionResult> ToggleInAppSharingAsync([FromRoute] Guid id)
        {
            await _metronomeSettingsService.ShareInAppToggleAsync(id);
            return NoContent();
        }

        [HttpPut("{id}/removeFromSharedInApp")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Removes setting from shared in app")]
        public async Task<IActionResult> RemoveFromSharedInAppAsync([FromRoute] Guid id)
        {
            await _metronomeSettingsService.RemoveFromSharedInAppAsync(id);
            return NoContent();
        }

        [HttpPut("comments/edit")]
        [SwaggerOperation(Summary = "Edits existing comment")]
        public async Task<IActionResult> EditComment(UpdateMetronomeSettingsCommentDto dto)
        {
            await _metronomeSettingsService.EditCommentAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deletes metronome setting")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            await _metronomeSettingsService.DeleteAsync(id);
            return NoContent();
        }

        [HttpDelete("comments/delete/{id}")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Deletes existing comment")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            await _metronomeSettingsService.DeleteCommentAsync(id);
            return NoContent();
        }
    }
}
