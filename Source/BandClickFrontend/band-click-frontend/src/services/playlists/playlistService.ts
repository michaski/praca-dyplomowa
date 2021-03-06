import { AddPlaylistComment } from "../../models/Comments/AddPlaylistComment";
import { CommentTransfer } from "../../models/Comments/EditComment";
import { QueryFilters } from "../../models/Filters/QueryFilters";
import { PostPlaylist } from "../../models/Playlists/PostPlaylist";
import { UpdatePlaylist } from "../../models/Playlists/UpdatePlaylist";
import { PLAYLISTS_CONTROLLER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import auth from "../auth/auth";

const PlaylistService = {
    getAll: async () => {
        const result = await requests.get(PLAYLISTS_CONTROLLER, auth.getToken(), undefined, false);
        return result;
    },
    getById: async (id: string) => {
        const result = await requests.get(`${PLAYLISTS_CONTROLLER}/${id}`, auth.getToken(), undefined, false);
        return result;
    },
    getAllShared: async (filters?: QueryFilters) => {
        const result = await requests.get(`${PLAYLISTS_CONTROLLER}/shared`, auth.getToken(), filters, false);
        return result;
    },
    isUserRatingPositive: async (playlistId: string): Promise<number> => {
        const result = await requests.get(`${PLAYLISTS_CONTROLLER}/${playlistId}/raitings/user`, auth.getToken(), undefined, false);
        return result.isPositive;
    },
    create: async (playlist: PostPlaylist) => {
        const result = await requests.post(`${PLAYLISTS_CONTROLLER}`, playlist, auth.getToken());
        return result;
    },
    addComment: async (comment: AddPlaylistComment) => {
        const result = await requests.post(`${PLAYLISTS_CONTROLLER}/comments/add`, comment, auth.getToken());
        return result;
    },
    update: async (playlistData: UpdatePlaylist) => {
        return await requests.put(PLAYLISTS_CONTROLLER, playlistData, auth.getToken());
    },
    addPositiveRaiting: async (playlistId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/raitings/positive/add`, null, auth.getToken());
    },
    addNegativeRaiting: async (playlistId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/raitings/negative/add`, null, auth.getToken());
    },
    removeUserRaiting: async (playlistId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/raitings/remove`, null, auth.getToken());
    },
    shareInBand: async (playlistId: string, bandId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/shareInBand/${bandId}`, null, auth.getToken());
    },
    removeFromBand: async (playlistId: string, bandId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/removeFromBand/${bandId}`, null, auth.getToken());
    },
    shareInApp: async (playlistId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/shareInApp`, null, auth.getToken());
    },
    removeFromSharedInApp: async (playlistId: string) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/${playlistId}/removeFromSharedInApp`, null, auth.getToken());
    },
    editComment: async (commentData: CommentTransfer) => {
        return await requests.put(`${PLAYLISTS_CONTROLLER}/comments/edit`, commentData, auth.getToken());
    },
    delete: async (id: string) => {
        return await requests.delete(`${PLAYLISTS_CONTROLLER}/${id}`, null, auth.getToken());
    },
    deleteComment: async (commentId: string) => {
        return await requests.delete(`${PLAYLISTS_CONTROLLER}/comments/delete/${commentId}`, null, auth.getToken());
    }
}

export default PlaylistService;
