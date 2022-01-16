import { settings } from "cluster";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import MetronomeSettingsService from "../../services/metronomeSettings/metronomeSettingsService";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import PlaylistService from "../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";
import { metronomeSettingsInitialState } from "../../store/reducers/metronomeSettings.reducer";
import playlistSelector from "../../store/selectors/playlist.selector";
import MetronomeSettingsOptions from "../metronomeSettings/MetronomeSettingsOptions";
import PositionSwitch from "../metronomeSettings/PositionSwitch";

interface PlaylistComponentProps {
    id: string,
    refreshPlaylist: boolean,
    onPlaylistRefreshed: Function,
    onSelectedSettingsChanged: Function,
    forceRefresh: Function
}

const PlaylistComponent: React.FC<PlaylistComponentProps> = ({id, refreshPlaylist, onPlaylistRefreshed, onSelectedSettingsChanged, forceRefresh}) => {
    const playlistData = useSelector(playlistSelector.getSelectedPlaylist);
    const [refresh, setRefresh] = useState(refreshPlaylist);
    const [selectedMetronomeSettings, setSelectedMetronomeSettings] = useState(metronomeSettingsInitialState);
    const metronomeActions = useAction(MetronomeSettingsStoreSerivce);
    const playlistActions = useAction(PlaylistStoreService);

    useEffect(() => {
        setRefresh(refreshPlaylist);
        getPlaylistData();
        onPlaylistRefreshed();
        setRefresh(false);
    }, [id]);

    const getPlaylistData = async () => {
        PlaylistService.getById(id)
            .then(result => {
                playlistActions.editPlaylist(result);
                playlistActions.setSelectedPlaylist(result);
            });
    }

    const changedMetronomeSetting = (settings: MetronomeSettings) => {
        metronomeActions.loadSettings(settings);
        setSelectedMetronomeSettings(settings);
        onSelectedSettingsChanged(settings);
    }

    const removeSettingFromPlaylist = (setting: MetronomeSettings) => {
        MetronomeSettingsService.removeFromPlaylist(setting.id, playlistData.id)
            .then(result => {
                MetronomeSettingsService.delete(setting.id);
                let modifiedPlaylist = playlistData;
                modifiedPlaylist.metronomeSettings = modifiedPlaylist.metronomeSettings.filter(ms => ms.id !== setting.id);
                playlistActions.editPlaylist(modifiedPlaylist);
                onSelectedSettingsChanged(metronomeSettingsInitialState);
                forceRefresh();
            });
    }

    const handleMoveUp = (setting: MetronomeSettings) => {
        const playlistState = playlistData;
        MetronomeSettingsService.moveUpInPlaylist(
            setting.id,
            playlistState.id)
            .then(_ => {
                getPlaylistData();
                forceRefresh();
            });
    }

    const handleMoveDown = (setting: MetronomeSettings) => {
        const playlistState = playlistData;
        MetronomeSettingsService.moveDownInPlaylist(
            setting.id,
            playlistState.id)
            .then(_ => {
                getPlaylistData();
                forceRefresh();
            });
    }

    return (
        <div>
            <button className="btn btn-warning">Ustawienia</button>
            <ul>
                {
                    playlistData.metronomeSettings?.map((setting, index) => {
                        return (
                            <li className="d-flex align-items-center" key={index} onClick={e => changedMetronomeSetting(setting)}>
                                <div className="d-inline-flex flex-column">
                                    <span>{setting.name}</span>
                                    <span>{setting.metre.beatsPerBar}/{setting.metre.rhythmicUnit} {setting.tempo} Bpm</span>
                                </div>
                                <div className="d-inline-flex">
                                    <MetronomeSettingsOptions settings={selectedMetronomeSettings} onSettingsChanged={forceRefresh} />
                                    <PositionSwitch
                                        playlist={playlistData}
                                        metronomeSettings={selectedMetronomeSettings}
                                        moveUp={() => {
                                            handleMoveUp(setting);
                                        }}
                                        moveDown={() => {
                                            handleMoveDown(setting);
                                        }}
                                        onPositionChanged={() => {
                                            console.log('Position changed');
                                            getPlaylistData()
                                                .then(result => {
                                                    forceRefresh();
                                                });
                                        }} />
                                    <button className="btn btn-sm btn-danger" onClick={() => {
                                        removeSettingFromPlaylist(setting);
                                    }}>&#10006;</button>
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
