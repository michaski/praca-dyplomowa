using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Application.Dtos.Playlist;
using BandClickBackend.Application.Dtos.PlaylistComment;

namespace BandClickBackend.Application.Interfaces
{
    public interface IPlaylistService
    {
        Task<IEnumerable<PlaylistListDto>> GetAllPlaylistsForUserAsync();
        Task<IEnumerable<PlaylistListDto>> GetAllSharedPlaylistsAsync();
        Task<SinglePlaylistDto> GetPlaylistByIdAsync(Guid id);
        Task<SinglePlaylistDto> AddPlaylistAsync(CreatePlaylistDto playlist);
        Task UpdatePlaylistAsync(EditPlaylistDto playlist);
        Task AddPositiveRaitingAsync(Guid id);
        Task AddNegativeRaitingAsync(Guid id);
        Task RemovePositiveRaitingAsync(Guid id);
        Task RemoveNegativeRaitingAsync(Guid id);
        Task ShareInAppToggleAsync(Guid id);
        Task RemoveFromSharedInAppAsync(Guid id);
        Task ShareInBandAsync(Guid playlistId, Guid bandId);
        Task RemoveFromBandAsync(Guid playlistId, Guid bandId);
        Task DeletePlaylistAsync(Guid id);
        Task<IEnumerable<PlaylistCommentDetailsDto>> GetPlaylistsCommentsAsync(Guid playlistId);
        Task<PlaylistCommentDetailsDto> AddCommentAsync(AddPlaylistCommentDto comment);
        Task EditCommentAsync(UpdatePlaylistCommentDto comment);
        Task DeleteCommentAsync(Guid commentId);
    }
}
