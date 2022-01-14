import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import PlaylistService from "../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";
import playlistSelector from "../../store/selectors/playlist.selector";

interface PlaylistComponentProps {
    id: string,
    forcePlaylistRefresh: boolean,
    onPlaylistRefreshed: Function,
    onSelectedSettingsChanged: Function
}

const PlaylistComponent: React.FC<PlaylistComponentProps> = ({id, forcePlaylistRefresh, onPlaylistRefreshed, onSelectedSettingsChanged}) => {
    const playlistData = useSelector(playlistSelector.getSelectedPlaylist);
    const [refresh, setRefresh] = useState(false);
    const [selectedMetronomeSettings, setSelectedMetronomeSettings] = useState({} as MetronomeSettings);
    const metronomeActions = useAction(MetronomeSettingsStoreSerivce);
    const playlistActions = useAction(PlaylistStoreService);

    useEffect(() => {
        setRefresh(forcePlaylistRefresh);
        getPlaylistData();
        onPlaylistRefreshed();
        setRefresh(false);
    }, [id]);

    const getPlaylistData = async () => {
        PlaylistService.getById(id)
            .then(result => {
                playlistActions.editPlaylist(result);
            });
    }

    const changedMetronomeSetting = (settings: MetronomeSettings) => {
        metronomeActions.loadSettings(settings);
        setSelectedMetronomeSettings(settings);
        onSelectedSettingsChanged(settings);
    }

    return (
        <div>
            <button className="btn btn-warning">Ustawienia</button>
            <ul>
                {
                    playlistData.metronomeSettings.map((setting, index) => {
                        return (
                            <li className="d-flex align-items-center" key={index} onClick={e => changedMetronomeSetting(setting)}>
                                <div className="d-inline-flex flex-column">
                                    <span>{setting.name}</span>
                                    <span>{setting.metre.beatsPerBar}/{setting.metre.rhythmicUnit} {setting.tempo} Bpm</span>
                                </div>
                                <div className="d-inline-flex">
                                    <button className="btn btn-sm btn-warning">Opcje</button>
                                    <button className="btn btn-sm btn-success">Przenieś</button>
                                    <button className="btn btn-sm btn-danger">Usuń</button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="autoSwitchCheck" />
                <label className="form-check-label" htmlFor="autoSwitchCheck">Automatyczna zmiana</label>
            </div>
        </div>
    );
}

export default PlaylistComponent;
