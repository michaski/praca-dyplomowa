import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";

export enum PlaylistStoreActions {
    ADD_PLAYLIST = 'ADD_PLAYLIST',
    EDIT_PLAYLIST = 'EDIT_PLAYLIST',
    DELETE_PLAYLIST = 'DELETE_PLAYLIST',
    ADD_SETTING_TO_PLAYLIST = 'ADD_SETTING_TO_PLAYLIST',
    REMOVE_SETTING_FROM_PLAYLIST = 'REMOVE_SETTING_FROM_PLAYLIST',
    CHANGE_SETTING_POSITION_IN_PLAYLIST = 'CHANGE_SETTING_POSITION_IN_PLAYLIST'
}

export interface AddPlaylistAction {
    type: PlaylistStoreActions.ADD_PLAYLIST,
    playlist: Playlist
}

export interface EditPlaylistAction {
    type: PlaylistStoreActions.EDIT_PLAYLIST,
    playlist: Playlist
}

export interface DeletePlaylistAction {
    type: PlaylistStoreActions.DELETE_PLAYLIST,
    playlist: Playlist
} 

export interface AddSettingToPlaylistAction {
    type: PlaylistStoreActions.ADD_SETTING_TO_PLAYLIST,
    playlist: Playlist,
    metronomeSettings: MetronomeSettings
}

export interface RemoveSettingFromPlaylistAction {
    type: PlaylistStoreActions.REMOVE_SETTING_FROM_PLAYLIST,
    playlist: Playlist,
    metronomeSettings: MetronomeSettings
}

export interface ChangeSettingPositionInPlaylistAction {
    type: PlaylistStoreActions.CHANGE_SETTING_POSITION_IN_PLAYLIST,
    playlist: Playlist,
    metronomeSettings: MetronomeSettings,
    newPosition: number
}

export type PlaylistActions = 
    AddPlaylistAction | 
    EditPlaylistAction | 
    DeletePlaylistAction | 
    AddSettingToPlaylistAction | 
    RemoveSettingFromPlaylistAction | 
    ChangeSettingPositionInPlaylistAction;

export const playlistAction = {
    addPlaylist: (playlist: Playlist): AddPlaylistAction => ({
        type: PlaylistStoreActions.ADD_PLAYLIST,
        playlist: playlist
    }),
    editPlaylist: (playlist: Playlist): EditPlaylistAction => ({
        type: PlaylistStoreActions.EDIT_PLAYLIST,
        playlist: playlist
    }),
    deletePlaylist: (playlist: Playlist): DeletePlaylistAction => ({
        type: PlaylistStoreActions.DELETE_PLAYLIST,
        playlist: playlist
    }),
    addSettingToPlaylist: (playlist: Playlist, metronomeSettings: MetronomeSettings): AddSettingToPlaylistAction => ({
        type: PlaylistStoreActions.ADD_SETTING_TO_PLAYLIST,
        playlist: playlist,
        metronomeSettings: metronomeSettings
    }),
    removeSettingFromPlaylist: (playlist: Playlist, metronomeSettings: MetronomeSettings): RemoveSettingFromPlaylistAction => ({
        type: PlaylistStoreActions.REMOVE_SETTING_FROM_PLAYLIST,
        playlist: playlist,
        metronomeSettings: metronomeSettings
    }),
    changeSettingPositionInPlaylist: (playlist: Playlist, metronomeSettings: MetronomeSettings, newPosition: number): ChangeSettingPositionInPlaylistAction => ({
        type: PlaylistStoreActions.CHANGE_SETTING_POSITION_IN_PLAYLIST,
        playlist: playlist,
        metronomeSettings: metronomeSettings,
        newPosition: newPosition
    })
}
