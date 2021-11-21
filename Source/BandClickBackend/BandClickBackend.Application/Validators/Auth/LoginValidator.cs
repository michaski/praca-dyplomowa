using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using BandClickBackend.Application.Dtos.Auth;
using FluentValidation;

namespace BandClickBackend.Application.Validators.Auth
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(dto => dto.Email)
                .NotEmpty()
                .EmailAddress();
            RuleFor(dto => dto.Password)
                .NotEmpty()
                .MinimumLength(6);
        }
    }
}
