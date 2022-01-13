import { combineReducers } from "redux";
import { MetronomeSettings } from "../models/MetronomeSettings/MetronomeSettings";
import { AuthActions } from "./actions/auth.actions";
import { PlaylistActions } from "./actions/playlists.actions";
import { Auth, authInitialState, authStoreReducer } from "./reducers/auth.reducer";
import { metronomeSettingsInitialState, metronomeSettingsStoreReducer } from "./reducers/metronomeSettings.reducer";
import { PlaylistList, playlistListInitialState, playlistsStoreReducer } from "./reducers/playlist.reducer";

export type StoreActionTypes = AuthActions | PlaylistActions;

export interface StoreState {
    auth: Auth,
    playlists: PlaylistList,
    metronomeSettings: MetronomeSettings
};

export const initialStoreState: any = {
    auth: authInitialState,
    playlists: playlistListInitialState,
    metronomeSettings: metronomeSettingsInitialState
};

export const reducers = combineReducers<StoreState>({
    auth: authStoreReducer,
    playlists: playlistsStoreReducer,
    metronomeSettings: metronomeSettingsStoreReducer
} as any);
