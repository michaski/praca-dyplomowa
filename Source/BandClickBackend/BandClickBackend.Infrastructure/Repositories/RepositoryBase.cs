using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public RepositoryBase()
        { }
        
        public RepositoryBase(BandClickDbContext context, IUserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        { 
            return await _context.Set<T>(typeof(T).ToString()).ToListAsync();
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _context.Set<T>(typeof(T).ToString()).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<T> AddAsync(T entity)
        {
            _context.Set<T>(typeof(T).ToString()).Add(entity);
            if (entity is AuditableEntity)
            {
                await _context.SaveChangesSignInAsync(_userContextService);
            }
            else
            {
                await _context.SaveChangesAsync();
            }
            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Set<T>(typeof(T).ToString()).Update(entity);
            if (entity is AuditableEntity)
            {
                await _context.SaveChangesSignInAsync(_userContextService);
            }
            else
            {
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>(typeof(T).ToString()).Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
