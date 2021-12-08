using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Entities;
using BandClickBackend.Domain.Interfaces;
using BandClickBackend.Infrastructure.Data;

namespace BandClickBackend.Infrastructure.Repositories
{
    public class AccentedBeatsRepository 
        : RepositoryBase<AccentedBeats>,
          IAccentedBeatsRepository
    {
        private readonly BandClickDbContext _context;
        private readonly IUserContextService _userContextService;

        public AccentedBeatsRepository(BandClickDbContext context, IUserContextService userContextService)
            : base(context, userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }
    }
}
