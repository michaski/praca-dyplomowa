import React, { useEffect, useState } from "react";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import PlaylistService from "../../services/playlists/playlistService";
import PlaylistComponent from "./PlaylistComponent";

interface PlaylistPickerProps {
    onSelectedSettingsChanged: Function
}

const PlaylistPicker: React.FC<PlaylistPickerProps> = ({onSelectedSettingsChanged}) => {
    const [playlists, setPlaylists] = useState([] as Playlist[]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

    useEffect(() => {
        if (playlists.length == 0) {
            getPlaylists();
        }
    }, []);

    const getPlaylists = async () => {
        const result = await PlaylistService.getAll();
        setPlaylists(result);
        setSelectedPlaylistId(result[0].id);
    }

    const handleSelectedSettingsChanged = (settings: MetronomeSettings) => {
        onSelectedSettingsChanged(settings);
    }

    return (
        <div className="col-md-4">
            <h2>Playlista</h2>
            <select name="playlists" id="playlist-select" onChange={e => {
                setSelectedPlaylistId(e.target.value);
            }}>
                {
                    playlists.map((playlist, index) => {
                        return <option key={index} value={playlist.id}>{playlist.name}</option>
                    })
                }
            </select>
            <PlaylistComponent id={selectedPlaylistId} onSelectedSettingsChanged={handleSelectedSettingsChanged} />
        </div>
    );
}

export default PlaylistPicker;
