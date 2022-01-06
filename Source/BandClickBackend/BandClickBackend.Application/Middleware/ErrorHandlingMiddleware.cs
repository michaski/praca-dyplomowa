using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace BandClickBackend.Application.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (ValidationException e)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsJsonAsync(new ExceptionAsJson(e));
            }
            catch (UserNotAllowedException e)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsJsonAsync(new ExceptionAsJson(e));
            }
            catch (FileNotFoundException e)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsJsonAsync(new ExceptionAsJson(e));
            }
            catch (Exception e)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new ExceptionAsJson($"Coś poszło nie tak...\n" +
                                                            $"Kod błędu: {context.Response.StatusCode}\n" +
                                                            "Treść:\n" +
                                                            $"{e.Message}"));
            }
        }
    }
}
