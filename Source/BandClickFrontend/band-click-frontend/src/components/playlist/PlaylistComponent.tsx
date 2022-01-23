import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import MetronomeSettingsService from "../../services/metronomeSettings/metronomeSettingsService";
import { MetronomeSettingsStoreSerivce } from "../../services/metronomeSettings/metronomeSettingsStoreService";
import PlaylistService from "../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../services/playlists/playlistStoreService";
import { metronomeSettingsInitialState } from "../../store/reducers/metronomeSettings.reducer";
import playlistSelector from "../../store/selectors/playlist.selector";
import AutoSwitch from "../metronomeSettings/AutoSwitch";
import MetronomeSettingsOptions from "../metronomeSettings/MetronomeSettingsOptions";
import PositionSwitch from "../metronomeSettings/PositionSwitch";
import './playlistStyles.css';

interface PlaylistComponentProps {
    id: string,
    refreshPlaylist: boolean,
    onPlaylistRefreshed: Function,
    onSelectedSettingsChanged: Function,
    forceRefresh: Function,
    barsFinished: number,
    onAutoSwitchToggle: Function
}

const PlaylistComponent: React.FC<PlaylistComponentProps> = ({id, refreshPlaylist, onPlaylistRefreshed, onSelectedSettingsChanged, forceRefresh, barsFinished, onAutoSwitchToggle}) => {
    const playlistData = useSelector(playlistSelector.getSelectedPlaylist);
    const [refresh, setRefresh] = useState(refreshPlaylist);
    const [selectedMetronomeSettings, setSelectedMetronomeSettings] = useState(metronomeSettingsInitialState);
    const [isAutoSwitchEnabled, setAutoSwitchEnabled] = useState(false);
    const [barProgress, setBarProgress] = useState(barsFinished);
    const metronomeActions = useAction(MetronomeSettingsStoreSerivce);
    const playlistActions = useAction(PlaylistStoreService);
    let previouslySelectedEmelentIndex = useRef(0);

    useEffect(() => {
        setRefresh(refreshPlaylist);
        getPlaylistData();
        onPlaylistRefreshed();
        setRefresh(false);
    }, [id]);

    const getPlaylistData = async () => {
        const previousElement = document.querySelector(`#metronome-setting-${previouslySelectedEmelentIndex.current}`);
        if (previousElement?.classList.contains('selected-setting')) {
            previousElement?.classList.remove('selected-setting');
        }
        PlaylistService.getById(id)
            .then(result => {
                playlistActions.editPlaylist(result);
                playlistActions.setSelectedPlaylist(result);
            });
    }

    const changedMetronomeSetting = (settings: MetronomeSettings, index: number) => {
        metronomeActions.loadSettings(settings);
        setSelectedMetronomeSettings(settings);
        onSelectedSettingsChanged(settings);
        const previousElement = document.querySelector(`#metronome-setting-${previouslySelectedEmelentIndex.current}`);
        const element = document.querySelector(`#metronome-setting-${index}`);
        if (previousElement?.classList.contains('selected-setting')) {
            previousElement?.classList.remove('selected-setting');
        }
        element?.classList.add('selected-setting');
        previouslySelectedEmelentIndex.current = index;
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
                previouslySelectedEmelentIndex.current--;
                const element = document.querySelector(`#metronome-setting-${previouslySelectedEmelentIndex.current}`);
                element?.classList.add('selected-setting');
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
                previouslySelectedEmelentIndex.current++;
                const element = document.querySelector(`#metronome-setting-${previouslySelectedEmelentIndex.current}`);
                element?.classList.add('selected-setting');
            });
    }

    const handleAutoSwitchToggle = (isOn: boolean) => {
        setAutoSwitchEnabled(isOn);
        onAutoSwitchToggle(isOn);
    }

    const handleSwitchRequested = () => {
        const currentSettingsIndex = playlistData.metronomeSettings.indexOf(selectedMetronomeSettings);
        if (currentSettingsIndex == playlistData.metronomeSettings.length - 1) {
            changedMetronomeSetting(playlistData.metronomeSettings[0], 0);
        } else {
            changedMetronomeSetting(playlistData.metronomeSettings[currentSettingsIndex + 1], currentSettingsIndex + 1);
        }
    }

    return (
        <div className="my-0 border">
            <ul className="playlist-list p-0 mb-0 text-start">
                {
                    playlistData.metronomeSettings?.map((setting, index) => {
                        return (
                            <li className="d-flex align-items-center justify-content-between playlist-item border-bottom px-4 py-2" key={index} id={`metronome-setting-${index}`} onClick={e => {
                                changedMetronomeSetting(setting, index);
                            }}>
                                <div className="d-inline-flex flex-column">
                                    <span className="setting-name">{setting.name}</span>
                                    <span className="setting-info">{setting.metre.beatsPerBar}/{setting.metre.rhythmicUnit} {setting.tempo} Bpm</span>
                                    <span className="setting-info">{setting.numberOfMeasures} takty</span>
                                </div>
                                <div className="d-inline-flex align-items-center settings-action-buttons">
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
                                            getPlaylistData()
                                                .then(result => {
                                                    forceRefresh();
                                                });
                                        }} />
                                        <MetronomeSettingsOptions settings={selectedMetronomeSettings} onSettingsChanged={forceRefresh} />
                                        <button className="btn btn-sm btn-danger" onClick={() => {
                                            removeSettingFromPlaylist(setting);
                                        }}>&#10006;</button>
                                </div>
                            </li>
                        );
                    })
                }
                {
                    (!playlistData.metronomeSettings || playlistData.metronomeSettings.length === 0) &&
                    <p className="fst-italic text-center mt-2">Brak zapisanych ustawień</p>
                }
            </ul>
            {
                playlistData && playlistData.metronomeSettings && playlistData.metronomeSettings.length > 0 &&
                <AutoSwitch 
                    onToggle={handleAutoSwitchToggle}
                    barsFinished={barsFinished}
                    totalBars={selectedMetronomeSettings.numberOfMeasures}
                    onSwitchRequested={handleSwitchRequested}
                />
            }
        </div>
    );
}

export default PlaylistComponent;

