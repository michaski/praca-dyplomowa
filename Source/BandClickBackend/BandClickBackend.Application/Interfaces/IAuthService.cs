using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Auth;
using BandClickBackend.Application.Dtos.User;

namespace BandClickBackend.Application.Interfaces
{
    public interface IAuthService
    {
        Task<SingleUserDto> RegisterUserAsync(RegisterUserDto user);
        Task<string> LoginAsync(LoginDto dto);
    }
}
