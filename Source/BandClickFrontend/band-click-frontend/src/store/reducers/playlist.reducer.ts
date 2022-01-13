import { Reducer } from "react";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import { PlaylistActions, PlaylistStoreActions } from "../actions/playlists.actions";

export interface PlaylistList {
    playlists: Playlist[]
}

export const playlistListInitialState: PlaylistList = {
    playlists: []
}

export const playlistsStoreReducer: Reducer<PlaylistList, PlaylistActions> = 
    (state: PlaylistList = playlistListInitialState, actions: PlaylistActions) => {
        let playlistState: Playlist | undefined = state.playlists.find(p => p.id === actions.playlist.id);
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
                break;
            case PlaylistStoreActions.DELETE_PLAYLIST:
                if (playlistState) {
                    return {
                        ...state,
                        playlists: [
                            ...state.playlists.filter(p => p.id !== actions.playlist.id)
                        ]
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
                    let metronomeSettingsState = playlistState.metronomeSettings.find(ms => ms.id === actions.metronomeSettings.id);
                    if (metronomeSettingsState) {
                        playlistState.metronomeSettings = playlistState.metronomeSettings.filter(ms => ms.id !== actions.metronomeSettings.id);
                        return {
                            ...state,
                            playlists: [
                                ...state.playlists.filter(p => p.id !== actions.playlist.id),
                                playlistState
                            ]
                        }
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
            default:
                return state;
        }
    }
