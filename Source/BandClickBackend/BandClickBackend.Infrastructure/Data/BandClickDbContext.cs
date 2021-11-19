using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Data
{
    public class BandClickDbContext : DbContext
    {
        public BandClickDbContext(DbContextOptions<BandClickDbContext> options)
            : base(options)
        { }
    }
}
