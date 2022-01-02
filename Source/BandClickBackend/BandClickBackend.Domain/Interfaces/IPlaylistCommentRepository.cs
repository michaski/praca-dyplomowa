using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IPlaylistCommentRepository
    {
        Task<PlaylistComment> GetByIdAsync(Guid id);
        Task<IEnumerable<PlaylistComment>> GetPlaylistsCommentsAsync(Guid playlistId);
        Task<PlaylistComment> AddCommentAsync(PlaylistComment comment);
        Task EditCommentAsync(PlaylistComment comment);
        Task DeleteCommentAsync(Guid commentId);
    }
}
