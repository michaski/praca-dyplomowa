using System;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IUserService
    {
        Task<SingleUserDto> GetUserByEmailAsync(string email);
        Task<SingleUserDto> GetUserByUsernameAsync(string username);
        Task<SingleUserDto> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(UpdateUserDto dto);
        Task ChangePasswordAsync(ChangeUserPasswordDto dto);
        Task PromoteUserToAdminAsync(Guid userId);
        Task DemoteAdminToUserAsync(Guid adminId);
    }
}
