using System;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.User;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IUserService
    {
        Task<SingleUserDto> GetUserByEmailAsync(string email);
        Task<SingleUserDto> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(SingleUserDto dto);
        Task PromoteUserToAdminAsync(Guid userId);
        Task DemoteAdminToUserAsync(Guid adminId);
    }
}
