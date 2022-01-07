using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Auth;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Exceptions;
using Swashbuckle.AspNetCore.Annotations;

namespace BandClickBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        [SwaggerOperation(Summary = "Authenticates user and returns Jwt token")]
        public async Task<IActionResult> Login([FromBody] LoginDto user)
        {
            var tokenDto = await _service.LoginAsync(user);
            if (tokenDto is null || string.IsNullOrEmpty(tokenDto.Token))
            {
                return Unauthorized(new ExceptionAsJson("Podano zły adres email lub hasło"));
            }
            return Ok(tokenDto);
        }

        [HttpPost("register")]
        [SwaggerOperation(Summary = "Creates new user account")]
        public async Task<IActionResult> RegisterNewUser([FromBody] RegisterUserDto user)
        {
            var registeredUser = await _service.RegisterUserAsync(user);
            if (registeredUser is null)
            {
                return BadRequest();
            }
            return Created($"/api/users/{registeredUser.Id}", registeredUser);
        }
    }
}
