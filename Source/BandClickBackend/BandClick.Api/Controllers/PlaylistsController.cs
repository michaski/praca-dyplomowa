using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Playlist;
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

        [HttpPut]
        [SwaggerOperation(Summary = "Edits playlist's data")]
        public async Task<IActionResult> EditPlaylistAsync([FromBody] EditPlaylistDto dto)
        {
            await _service.UpdatePlaylistAsync(dto);
            return NoContent();
        }

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

        [HttpDelete]
        [SwaggerOperation(Summary = "Deletes playlist with given id")]
        public async Task<IActionResult> DeletePlaylistAsync(Guid id)
        {
            await _service.DeletePlaylistAsync(id);
            return NoContent();
        }
    }
}
