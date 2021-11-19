using System;
using System.Transactions;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.IntegrationTests.Utils
{
    public class IntegrationTestBase : IDisposable
    {
        public BandClickDbContext Context { get; private set; }
        private TransactionScope _transactionScope;

        public IntegrationTestBase()
        {
            var dataContextOptions = new DbContextOptionsBuilder<BandClickDbContext>()
                .UseNpgsql("Host=localhost;Database=BandClickTestDb;Username=postgres;Password=admin")
                .Options;
            Context = new BandClickDbContext(dataContextOptions);
            Context.Database.EnsureCreated();
            _transactionScope = new TransactionScope();
        }

        public void Dispose()
        {
            _transactionScope.Dispose();
            Context.Dispose();
        }

        public virtual void SeedDb()
        {
            throw new NotImplementedException();
        }
    }
}
