import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import store from "../../store";
import { playlistAction } from "../../store/actions/playlists.actions";

export class PlaylistStoreService {
    addPlaylist(playlist: Playlist) {
        store.dispatch(playlistAction.addPlaylist(playlist));
    }
    addPlaylists(playlists: Playlist[]) {
        store.dispatch(playlistAction.addPlaylists(playlists));
    }
    editPlaylist(playlist: Playlist) {
        store.dispatch(playlistAction.editPlaylist(playlist));
    }
    deletePlaylist(playlist: Playlist) {
        store.dispatch(playlistAction.deletePlaylist(playlist));
    }
    addSettingToPlaylist(playlist: Playlist, setting: MetronomeSettings) {
        store.dispatch(playlistAction.addSettingToPlaylist(playlist, setting));
    }
    removeSettingFromPlaylist(playlist: Playlist, setting: MetronomeSettings) {
        store.dispatch(playlistAction.removeSettingFromPlaylist(playlist, setting));
    }
    changeSettingPositionInPlaylist(playlist: Playlist, setting: MetronomeSettings, newPosition: number) {
        store.dispatch(playlistAction.changeSettingPositionInPlaylist(playlist, setting, newPosition));
    }
    setSelectedPlaylist(playlist: Playlist) {
        store.dispatch(playlistAction.setSelectedPlaylist(playlist));
    }
}
