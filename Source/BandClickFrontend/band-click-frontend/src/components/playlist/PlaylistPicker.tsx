import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import PlaylistService from "../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";
import playlistSelector from "../../store/selectors/playlist.selector";
import PlaylistComponent from "./PlaylistComponent";

interface PlaylistPickerProps {
    forcePlaylistRefresh: boolean,
    onPlaylistRefreshed: Function,
    onSelectedPlaylistChange: Function,
    onSelectedSettingsChanged: Function,
    refreshPlaylist: Function
}

const PlaylistPicker: React.FC<PlaylistPickerProps> = ({forcePlaylistRefresh, onPlaylistRefreshed, onSelectedPlaylistChange, onSelectedSettingsChanged, refreshPlaylist}) => {
    const [playlists, setPlaylists] = useState([] as Playlist[]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const playlistActions = useAction(PlaylistStoreService);
    const playlistsStore = useSelector(playlistSelector.getAll);

    useEffect(() => {
        if (playlists.length === 0) {
            getPlaylists();
        }
    }, []);

    const getPlaylists = () => {
        PlaylistService.getAll()
            .then(result => {
                setPlaylists(result);
                playlistActions.addPlaylists(result);
                fetchPlaylistInfo(result[0].id);
                setSelectedPlaylistId(result[0].id);
            });
    }

    const handleSelectedSettingsChanged = (settings: MetronomeSettings) => {
        onSelectedSettingsChanged(settings);
    }

    const fetchPlaylistInfo = (playlistId: string) => {
        PlaylistService.getById(playlistId)
            .then(playlistInfo => {
                playlistActions.editPlaylist(playlistInfo);
                playlistActions.setSelectedPlaylist(playlistInfo);
            });
    }

    const handleSelectedPlaylistChanged = (playlistId: string) => {
        setSelectedPlaylistId(playlistId);
        onSelectedPlaylistChange(playlistId);
        const selectedPlaylistState = playlistsStore.find(p => p.id === playlistId) || playlistsStore[0];
        if (!selectedPlaylistState || !selectedPlaylistState.metronomeSettings) {
            fetchPlaylistInfo(playlistId);
        }
    }

    return (
        <div className="col-md-4">
            <h2>Playlista</h2>
            <select name="playlists" id="playlist-select" onChange={e => {
                handleSelectedPlaylistChanged(e.target.value);
            }}>
                {
                    playlists.map((playlist, index) => {
                        return <option key={index} value={playlist.id}>{playlist.name}</option>
                    })
                }
            </select>
            <PlaylistComponent 
                id={selectedPlaylistId} 
                onSelectedSettingsChanged={handleSelectedSettingsChanged} 
                refreshPlaylist={forcePlaylistRefresh} 
                onPlaylistRefreshed={onPlaylistRefreshed}
                forceRefresh={refreshPlaylist} />
        </div>
    );
}

export default PlaylistPicker;
