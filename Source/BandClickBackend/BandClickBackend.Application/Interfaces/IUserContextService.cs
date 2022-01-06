using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Application.Interfaces
{
    public interface IUserContextService
    {
        ClaimsPrincipal User { get; }
        Guid? UserId { get; }
        SystemRole SystemRole { get; }
        List<(Guid BandId, Guid BandRoleId)> UserBandRoles { get; }
        public bool IsAdmin { get; }
        public bool IsEntityCreator(AuditableEntity entity);
    }
}
