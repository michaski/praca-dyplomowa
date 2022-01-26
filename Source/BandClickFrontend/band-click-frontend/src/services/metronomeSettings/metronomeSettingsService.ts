import { AddMetronomeSettingsComment } from "../../models/Comments/AddMetronomeSettingsComment";
import { CommentTransfer } from "../../models/Comments/EditComment";
import { QueryFilters } from "../../models/Filters/QueryFilters";
import { Metre } from "../../models/Metre/Metre";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsType } from "../../models/MetronomeSettings/MetronomeSettingsType";
import { PagedMetronomeSettings } from "../../models/MetronomeSettings/PagedMetronomeSettings";
import { PostMetronomeSettings } from "../../models/MetronomeSettings/PostMetronomeSettings";
import { UpdateMetronomeSettings } from "../../models/MetronomeSettings/UpdateMetronomeSettings";
import { METRONOME_SETTINGS_COMMENTS, METRONOME_SETTINGS_CONTROLLER } from "../../utils/apiUrls";
import requests from "../../utils/requests/requests";
import auth from "../auth/auth";
import MetreService from "../metre/metreService";

const MetronomeSettingsService = {
    getAllCreatedByUser: async (): Promise<MetronomeSettings[]> => {
        const result = await requests.get(METRONOME_SETTINGS_CONTROLLER, auth.getToken(), undefined, false) as MetronomeSettings[];
        return result;
    },
    getById: async (id: string): Promise<MetronomeSettings> => {
        const result = await requests.get(`${METRONOME_SETTINGS_CONTROLLER}/${id}`, auth.getToken(), undefined, false) as MetronomeSettings;
        return result;
    },
    getAllShared: async (filters?: QueryFilters): Promise<PagedMetronomeSettings> => {
        const result = await requests.get(`${METRONOME_SETTINGS_CONTROLLER}/shared`, auth.getToken(), filters, false) as PagedMetronomeSettings;
        return result;
    },
    getTypes: async (): Promise<MetronomeSettingsType[]> => {
        const result = await requests.get(`${METRONOME_SETTINGS_CONTROLLER}/types`, auth.getToken(), undefined, false) as MetronomeSettingsType[];
        return result;
    },
    isUserRatingPositive: async (metronomeSettingId: string): Promise<number> => {
        const result = await requests.get(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/raitings/user`, auth.getToken());
        return result.isPositive;
    },
    create: async (metronomeSettingData: PostMetronomeSettings) => {
        const result = await requests.post(`${METRONOME_SETTINGS_CONTROLLER}`, metronomeSettingData, auth.getToken());
        return result;
    },
    addComment: async (comment: AddMetronomeSettingsComment) => {
        const result = await requests.post(`${METRONOME_SETTINGS_COMMENTS}/add`, comment, auth.getToken());
        return result;
    },
    update: async (metronomeSettingsData: UpdateMetronomeSettings, metreData: Metre) => {
        const metronomeSettings = await requests.put(METRONOME_SETTINGS_CONTROLLER, metronomeSettingsData, auth.getToken());
        const metre = await MetreService.updateMetre(metreData);
        return {
            metronomeSettings,
            metre
        };
    },
    changeType: async (metronomeSettingId: string, typeId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/changeType/${typeId}`, null, auth.getToken());
    },
    addPositiveRaiting: async (metronomeSettingId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/raitings/positive/add`, null, auth.getToken());
    },
    addNegativeRaiting: async (metronomeSettingId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/raitings/negative/add`, null, auth.getToken());
    },
    removeUserRaiting: async (metronomeSettingId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/raitings/remove`, null, auth.getToken());
    },
    addToPlaylist: async (metronomeSettingId: string, playlistId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/addToPlaylist/${playlistId}`, null, auth.getToken());
    },
    removeFromPlaylist: async (metronomeSettingId: string, playlistId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/removeFromPlaylist/${playlistId}`, null, auth.getToken());
    },
    changePositionInPlaylist: async (metronomeSettingId: string, playlistId: string, newPosition: number) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/changePositionInPlaylist/${playlistId}/${newPosition}`, null, auth.getToken());
    },
    moveUpInPlaylist: async (metronomeSettingId: string, playlistId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/moveUpInPlaylist/${playlistId}`, null, auth.getToken());
    },
    moveDownInPlaylist: async (metronomeSettingId: string, playlistId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/moveDownInPlaylist/${playlistId}`, null, auth.getToken());
    },
    shareInApp: async (metronomeSettingId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/shareInApp/${metronomeSettingId}`, null, auth.getToken());
    },
    removeFromSharedInApp: async (metronomeSettingId: string) => {
        return await requests.put(`${METRONOME_SETTINGS_CONTROLLER}/${metronomeSettingId}/removeFromSharedInApp`, null, auth.getToken());
    },
    editComment: async (commentData: CommentTransfer) => {
        return await requests.put(`${METRONOME_SETTINGS_COMMENTS}/edit`, commentData, auth.getToken());
    },
    delete: async (id: string) => {
        return await requests.delete(`${METRONOME_SETTINGS_CONTROLLER}/${id}`, null, auth.getToken());
    },
    deleteComment: async (commentId: string) => {
        return await requests.delete(`${METRONOME_SETTINGS_COMMENTS}/delete/${commentId}`, null, auth.getToken());
    }
}

export default MetronomeSettingsService;
