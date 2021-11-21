using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BandClickDbContext _context;

        public UserRepository(BandClickDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> CreateUserAsync(User user, SystemRole role)
        {
            user.SystemRole = role;
            _context.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
