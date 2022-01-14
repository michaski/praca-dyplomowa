import { createSelector } from "reselect";
import { StoreState } from "../store";

const playlistSelector = {
    getAll: createSelector(
        (state: StoreState) => state.playlists,
        playlists => playlists.playlists
    ),
    getById: createSelector(
        (state: StoreState, id: string) => state.playlists.playlists.find(p => p.id === id),
        playlist => playlist
    ),
    getSelectedPlaylist: createSelector(
        (state: StoreState) => state.playlists,
        playlist => playlist.selectedPlaylist
    )
}

export default playlistSelector;
