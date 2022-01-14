import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";

export enum PlaylistStoreActions {
    ADD_PLAYLIST = 'ADD_PLAYLIST',
    ADD_PLAYLISTS = 'ADD_PLAYLISTS',
    EDIT_PLAYLIST = 'EDIT_PLAYLIST',
    DELETE_PLAYLIST = 'DELETE_PLAYLIST',
    ADD_SETTING_TO_PLAYLIST = 'ADD_SETTING_TO_PLAYLIST',
    REMOVE_SETTING_FROM_PLAYLIST = 'REMOVE_SETTING_FROM_PLAYLIST',
    CHANGE_SETTING_POSITION_IN_PLAYLIST = 'CHANGE_SETTING_POSITION_IN_PLAYLIST',
    SET_SELECTED_PLAYLIST = 'SET_SELECTED_PLAYLIST'
}

export interface AddPlaylistAction {
    type: PlaylistStoreActions.ADD_PLAYLIST,
    playlist: Playlist
}

export interface AddPlaylistsAction {
    type: PlaylistStoreActions.ADD_PLAYLISTS,
    playlists: Playlist[]
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

export interface SetSelectedPlaylist {
    type: PlaylistStoreActions.SET_SELECTED_PLAYLIST,
    playlist: Playlist
}

export type PlaylistActions = 
    AddPlaylistAction | 
    AddPlaylistsAction |
    EditPlaylistAction | 
    DeletePlaylistAction | 
    AddSettingToPlaylistAction | 
    RemoveSettingFromPlaylistAction | 
    ChangeSettingPositionInPlaylistAction |
    SetSelectedPlaylist;

export const playlistAction = {
    addPlaylist: (playlist: Playlist): AddPlaylistAction => ({
        type: PlaylistStoreActions.ADD_PLAYLIST,
        playlist: playlist
    }),
    addPlaylists: (playlists: Playlist[]): AddPlaylistsAction => ({
        type: PlaylistStoreActions.ADD_PLAYLISTS,
        playlists: playlists
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
    }),
    setSelectedPlaylist: (playlist: Playlist) => ({
        type: PlaylistStoreActions.SET_SELECTED_PLAYLIST,
        playlist: playlist
    })
}
