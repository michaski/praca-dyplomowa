using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public UserRepository(BandClickDbContext context, IUserContextService userContextService)
            : base(context, userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .Include(u => u.SystemRole)
                .SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.SystemRole)
                .SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(u => u.SystemRole)
                .SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> CreateUserAsync(User user, SystemRole role)
        {
            user.SystemRole = role;
            _context.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
