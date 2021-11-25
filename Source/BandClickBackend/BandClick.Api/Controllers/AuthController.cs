using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Auth;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Application.Interfaces;
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

        [HttpPost("login")]
        [SwaggerOperation(Summary = "Authenticates user and returns Jwt token")]
        public async Task<IActionResult> Login([FromBody] LoginDto user)
        {
            var token = await _service.LoginAsync(user);
            if (String.IsNullOrEmpty(token))
            {
                return BadRequest("Podano zły adres email lub hasło");
            }
            return Ok(token);
        }
    }
}
