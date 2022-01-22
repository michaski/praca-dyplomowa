using System;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;
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
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet("email/{email}")]
        [SwaggerOperation(Summary = "Gets user by email address")]
        public async Task<IActionResult> GetUserByEmailAsync([FromRoute] string email)
        {
            var result = await _service.GetUserByEmailAsync(email);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("username/{username}")]
        [SwaggerOperation(Summary = "Gets user by username")]
        public async Task<IActionResult> GetUserByUsernameAsync([FromRoute] string username)
        {
            var result = await _service.GetUserByUsernameAsync(username);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("id/{id}")]
        [SwaggerOperation(Summary = "Gets user by id")]
        public async Task<IActionResult> GetUserByIdAsync([FromRoute] Guid id)
        {
            var result = await _service.GetUserByIdAsync(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Updates user info")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto dto)
        {
            await _service.UpdateUserAsync(dto);
            return NoContent();
        }

        [HttpPut("changePassword")]
        [SwaggerOperation(Summary = "Updates user info")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangeUserPasswordDto dto)
        {
            await _service.ChangePasswordAsync(dto);
            return NoContent();
        }

        [HttpPut("{userId}/promoteToAdmin")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Promotes user to admin")]
        public async Task<IActionResult> PromoteUserToAdminAsync([FromRoute] Guid userId)
        {
            await _service.PromoteUserToAdminAsync(userId);
            return NoContent();
        }

        [HttpPut("{adminId}/demoteToUser")]
        [Authorize(Roles = "Admin")]
        [SwaggerOperation(Summary = "Demotes admin to user")]
        public async Task<IActionResult> DemoteAdminToUserAsync([FromRoute] Guid adminId)
        {
            await _service.DemoteAdminToUserAsync(adminId);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deletes user account")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            await _service.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
