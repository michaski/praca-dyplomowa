import React, { useEffect, useState } from "react"
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import PlaylistService from "../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";
import { metronomeSettingsAction } from "../../store/actions/metronomeSettings.actions";

interface PlaylistComponentProps {
    id: string,
    onSelectedSettingsChanged: Function
}

const PlaylistComponent: React.FC<PlaylistComponentProps> = ({id, onSelectedSettingsChanged}) => {
    const [playlistData, setPlaylistData] = useState({} as Playlist);
    const [selectedMetronomeSettings, setSelectedMetronomeSettings] = useState({} as MetronomeSettings);
    // const metronomeActions = useAction(MetronomeSettingsStoreSerivce);

    useEffect(() => {
        getPlaylistData();
    }, [id]);

    const getPlaylistData = async () => {
        const result = await PlaylistService.getById(id);
        setPlaylistData(result);
    }

    const changedMetronomeSetting = (settings: MetronomeSettings) => {
        setSelectedMetronomeSettings(settings);
        onSelectedSettingsChanged(settings);
        // metronomeActions.loadSettings(settings);
    }

    return (
        <div>
            <button className="btn btn-warning">Ustawienia</button>
            <ul>
                {
                    playlistData?.metronomeSettings?.map((setting, index) => {
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
