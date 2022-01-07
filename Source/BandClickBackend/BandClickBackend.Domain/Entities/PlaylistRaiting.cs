using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Common;

namespace BandClickBackend.Domain.Entities
{
    public class PlaylistRaiting : BaseEntity
    {
        public Playlist Playlist { get; set; }
        public Guid PlaylistId { get; set; }
        public bool IsPositive { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}
