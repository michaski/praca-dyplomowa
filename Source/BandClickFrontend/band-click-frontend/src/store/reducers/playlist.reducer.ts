import { Reducer } from "react";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import { PlaylistActions, PlaylistStoreActions } from "../actions/playlists.actions";

export interface PlaylistList {
    playlists: Playlist[],
    selectedPlaylist: Playlist
}

export const playlistIninialState: Playlist = {
    id: '',
    name: '',
    metronomeSettings: [],
    isShared: false,
    comments: [],
    positiveRaitingCount: 0,
    negativeRaitingCount: 0
}

export const playlistListInitialState: PlaylistList = {
    playlists: [],
    selectedPlaylist: playlistIninialState
}

export const playlistsStoreReducer: Reducer<PlaylistList, PlaylistActions> = 
    (state: PlaylistList = playlistListInitialState, actions: PlaylistActions) => {
        if (actions.type === PlaylistStoreActions.ADD_PLAYLISTS) {
            let playlistsState = state.playlists;
            actions.playlists.forEach(playlist => {
                if (!playlistsState.find(p => p.id === playlist.id)) {
                    playlistsState.push(playlist);
                }
            });
            return {
                ...state,
                playlists: [
                    ...playlistsState
                ]
            };
        }
        let playlistState: Playlist | undefined = undefined;
        if (actions.type as PlaylistStoreActions && actions.playlist){
            playlistState = state.playlists.find(p => p.id === actions.playlist.id);
        } 
        switch (actions.type) {
            case PlaylistStoreActions.ADD_PLAYLIST:
                return {
                    ...state,
                    playlists: [
                        ...state.playlists,
                        actions.playlist
                    ]
                }
            case PlaylistStoreActions.EDIT_PLAYLIST:
                if (playlistState) {
                    return {
                        ...state,
                        playlists: [
                            ...state.playlists.filter(p => p.id !== actions.playlist.id),
                            actions.playlist
                        ]
                    }
                }
                return state;
            case PlaylistStoreActions.DELETE_PLAYLIST:
                if (playlistState) {
                    console.log(state.playlists);
                    let playlistsAfterDelete = state.playlists.filter(p => p.id !== actions.playlist.id);
                    console.log(playlistsAfterDelete);
                    return {
                        selectedPlaylist: state.selectedPlaylist,
                        playlists: playlistsAfterDelete
                    }
                }
                return state;
            case PlaylistStoreActions.ADD_SETTING_TO_PLAYLIST:
                if (playlistState) {
                    playlistState.metronomeSettings.push(actions.metronomeSettings);
                    return {
                        ...state,
                        playlists: [
                            ...state.playlists.filter(p => p.id !== actions.playlist.id),
                            playlistState
                        ]
                    }
                }
                return state;
            case PlaylistStoreActions.REMOVE_SETTING_FROM_PLAYLIST:
                if (playlistState) {
                    playlistState.metronomeSettings = playlistState.metronomeSettings.filter(ms => ms.id !== actions.metronomeSettings.id);
                    return {
                        ...state,
                        playlists: [
                            ...state.playlists.filter(p => p.id !== actions.playlist.id),
                            playlistState
                        ]
                    }
                }
                return state;
            case PlaylistStoreActions.CHANGE_SETTING_POSITION_IN_PLAYLIST:
                if (playlistState) {
                    let metronomeSettingsState = playlistState.metronomeSettings.find(ms => ms.id === actions.metronomeSettings.id);
                    if (metronomeSettingsState) {
                        if (actions.newPosition >= 0 && actions.newPosition < playlistState.metronomeSettings.length) {
                            let otherSettings = playlistState.metronomeSettings.filter(ms => ms.id !== actions.metronomeSettings.id);
                            let newList: MetronomeSettings[] = [];
                            for (let i=0, otherSettingsIndex=0; i<playlistState.metronomeSettings.length; i++) {
                                if (i === actions.newPosition) {
                                    newList.push(metronomeSettingsState);
                                } else {
                                    newList.push(otherSettings[otherSettingsIndex++]);
                                }
                            }
                            playlistState.metronomeSettings = newList;
                            return {
                                ...state,
                                playlists: [
                                    ...state.playlists.filter(p => p.id !== actions.playlist.id),
                                    playlistState
                                ]
                            }
                        }
                    }
                }
                return state;
            case PlaylistStoreActions.SET_SELECTED_PLAYLIST:
                return {
                    ...state,
                    selectedPlaylist: actions.playlist
                }
            default:
                return state;
        }
    }
