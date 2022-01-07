using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Playlist;
using BandClickBackend.Application.Dtos.PlaylistComment;
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
    public class PlaylistsController : ControllerBase
    {
        private readonly IPlaylistService _service;
        private readonly IBandService _bandService;

        public PlaylistsController(IPlaylistService service, IBandService bandService)
        {
            _service = service;
            _bandService = bandService;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Gets all playlist created by user")]
        public async Task<IActionResult> GetAllPlaylistsForUserAsync()
        {
            var result = await _service.GetAllPlaylistsForUserAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("shared")]
        [SwaggerOperation(Summary = "Gets all playlists shared in app")]
        public async Task<IActionResult> GetAllSharedPlaylistsAsync()
        {
            var result = await _service.GetAllSharedPlaylistsAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Gets playlist with given id")]
        public async Task<IActionResult> GetPlaylistByIdAsync([FromRoute] Guid id)
        {
            var result = await _service.GetPlaylistByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id}/raitings/user")]
        [SwaggerOperation(Summary =
            "Returns true if user has given positive raiting, false otherwise. If user hasn't given raiting, returns 404")]
        public async Task<IActionResult> GetUserRaitingTypeAsync(Guid id)
        {
            var result = await _service.GetIsUserRaitingPositiveAsync(id);
            if (result.IsPositive is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Creates new playlist")]
        public async Task<IActionResult> CreatePlaylistAsync([FromBody] CreatePlaylistDto dto)
        {
            var result = await _service.AddPlaylistAsync(dto);
            if (result is null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("comments/add")]
        [SwaggerOperation(Summary = "Adds comment to shared playlist")]
        public async Task<IActionResult> AddComment(AddPlaylistCommentDto dto)
        {
            var comment = await _service.AddCommentAsync(dto);
            if (comment is null)
            {
                return BadRequest();
            }
            return Created($"comments/{comment.Id}", comment);
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Edits playlist's data")]
        public async Task<IActionResult> EditPlaylistAsync([FromBody] EditPlaylistDto dto, [FromQuery] Guid? bandId)
        {
            await _service.UpdatePlaylistAsync(dto, bandId);
            return NoContent();
        }

        [HttpPut("{id}/raitings/positive/add")]
        [SwaggerOperation(Summary = "Adds positive raiting to shared playlist")]
        public async Task<IActionResult> AddPositiveRaiting(Guid id)
        {
            await _service.AddPositiveRaitingAsync(id);
            return NoContent();
        }

        //[HttpPut("{id}/raitings/positive/subtract")]
        //[SwaggerOperation(Summary = "Subtracts positive raiting from shared setting")]
        //public async Task<IActionResult> SubtractPositiveRaiting(Guid id)
        //{
        //    await _service.RemovePositiveRaitingAsync(id);
        //    return NoContent();
        //}

        [HttpPut("{id}/raitings/negative/add")]
        [SwaggerOperation(Summary = "Adds negative raiting to shared playlist")]
        public async Task<IActionResult> AddNegativeRaiting(Guid id)
        {
            await _service.AddNegativeRaitingAsync(id);
            return NoContent();
        }

        [HttpPut("{id}/raitings/remove")]
        [SwaggerOperation(Summary = "Removes user's raiting from shared playlist")]
        public async Task<IActionResult> RemoveUserRaiting(Guid id)
        {
            await _service.RemoveRaitingAsync(id);
            return NoContent();
        }

        //[HttpPut("{id}/raitings/negative/subtract")]
        //[SwaggerOperation(Summary = "Subtracts negative raiting from shared setting")]
        //public async Task<IActionResult> SubtractNegativeRaiting(Guid id)
        //{
        //    await _service.RemoveNegativeRaitingAsync(id);
        //    return NoContent();
        //}

        [HttpPut("{playlistId}/shareInBand/{bandId}")]
        [SwaggerOperation(Summary = "Shares playlist in band")]
        public async Task<IActionResult> SharePlaylistInBandAsync([FromRoute] Guid playlistId, [FromRoute] Guid bandId)
        {
            if (!await _bandService.IsUserBandLeaderAsync(bandId))
            {
                return Forbid();
            }
            await _service.ShareInBandAsync(playlistId, bandId);
            return NoContent();
        }

        [HttpPut("{playlistId}/removeFromBand/{bandId}")]
        [SwaggerOperation(Summary = "Removes playlist from band")]
        public async Task<IActionResult> RemovePlaylistFromBandAsync([FromRoute] Guid playlistId, [FromRoute] Guid bandId)
        {
            if (!await _bandService.IsUserBandLeaderAsync(bandId))
            {
                return Forbid();
            }
            await _service.RemoveFromBandAsync(playlistId, bandId);
            return NoContent();
        }

        [HttpPut("{playlistId}/shareInApp")]
        [SwaggerOperation(Summary = "Toggles playlist in app share status")]
        public async Task<IActionResult> TogglePlaylistInAppSharingAsync([FromRoute] Guid playlistId)
        {
            await _service.ShareInAppToggleAsync(playlistId);
            return NoContent();
        }

        [HttpPut("{playlistId}/removeFromSharedInApp")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Removes playlist from shared in app")]
        public async Task<IActionResult> RemoveFromSharedInAppAsync([FromRoute] Guid playlistId)
        {
            await _service.RemoveFromSharedInAppAsync(playlistId);
            return NoContent();
        }

        [HttpPut("comments/edit")]
        [SwaggerOperation(Summary = "Edits existing comment")]
        public async Task<IActionResult> EditComment(UpdatePlaylistCommentDto dto)
        {
            await _service.EditCommentAsync(dto);
            return NoContent();
        }

        [HttpDelete]
        [SwaggerOperation(Summary = "Deletes playlist with given id")]
        public async Task<IActionResult> DeletePlaylistAsync(Guid id)
        {
            await _service.DeletePlaylistAsync(id);
            return NoContent();
        }

        [HttpDelete("comments/delete/{id}")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Deletes existing comment")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            await _service.DeleteCommentAsync(id);
            return NoContent();
        }
    }
}
