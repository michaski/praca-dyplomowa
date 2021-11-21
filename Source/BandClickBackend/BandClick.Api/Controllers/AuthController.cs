﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            var registeredUser = await _service.RegisterUser(user);
            if (registeredUser is null)
            {
                return BadRequest();
            }
            return Created($"/api/users/{registeredUser.Id}", registeredUser);
        }
    }
}