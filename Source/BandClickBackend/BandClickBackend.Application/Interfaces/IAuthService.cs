using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;

namespace BandClickBackend.Application.Interfaces
{
    public interface IAuthService
    {
        Task<SingleUserDto> RegisterUser(RegisterUserDto user);
    }
}
