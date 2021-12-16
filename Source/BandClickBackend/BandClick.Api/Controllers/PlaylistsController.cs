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

        public PlaylistsController(IPlaylistService service)
        {
            _service = service;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Gets all playlist created by user")]
        public async Task<IActionResult> GetAllPlaylistsForUser()
        {
            var result = await _service.GetAllPlaylistsForUser();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("shared")]
        [SwaggerOperation(Summary = "Gets all playlists shared in app")]
        public async Task<IActionResult> GetAllSharedPlaylists()
        {
            var result = await _service.GetAllSharedPlaylists();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Gets playlist with given id")]
        public async Task<IActionResult> GetPlaylistById([FromRoute] Guid id)
        {
            var result = await _service.GetPlaylistById(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Creates new playlist")]
        public async Task<IActionResult> CreatePlaylist([FromBody] CreatePlaylistDto dto)
        {
            var result = await _service.AddPlaylist(dto);
            if (result is null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Edit playlist's data")]
        public async Task<IActionResult> EditPlaylist([FromBody] EditPlaylistDto dto)
        {
            await _service.UpdatePlaylist(dto);
            return NoContent();
        }

        [HttpDelete]
        [SwaggerOperation(Summary = "Deletes playlist with given id")]
        public async Task<IActionResult> DeletePlaylist(Guid id)
        {
            await _service.DeletePlaylist(id);
            return NoContent();
        }
    }
}
