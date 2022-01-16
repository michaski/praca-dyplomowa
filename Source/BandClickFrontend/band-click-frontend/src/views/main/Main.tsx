import React, { useRef, useState } from "react";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { Metronome } from "../../components/metronome/Metronome";
import PlaylistPicker from "../../components/playlist/PlaylistPicker";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { metronomeSettingsInitialState } from "../../store/reducers/metronomeSettings.reducer";

const Main = (props: any) => {
    const [selectedSettings, setSelectedSettings] = useState(metronomeSettingsInitialState);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [forcePlaylistRefresh, setForcePlaylistRefresh] = useState(false);
    const [barCount, setBarCount] = useState(0);
    const [autoSwitchState, setAutoSwitchState] = useState(false);

    const handleSelectedSettingsChanged = (settings: MetronomeSettings) => {
        setSelectedSettings(settings);
        setBarCount(0);
    }

    const handleSelectedPlaylistChanged = (playlistId: string) => {
        setSelectedPlaylistId(playlistId);
    }

    const handleFinishedBar = (bars: number) => {
        setBarCount(bars);
        const state = barCount;
    }

    const handleAutoSwitchToggle = (state: boolean) => {
        setBarCount(0);
        const currentState= autoSwitchState;
        setAutoSwitchState(!currentState);
        const newState = autoSwitchState;
    }

    return (
        <div className="containter-fluid">
            <LoggedInHeader />
            <div className="row">
                <Metronome 
                    settings={selectedSettings} 
                    playlistId={selectedPlaylistId} 
                    onSettingsAdded={() => setForcePlaylistRefresh(true)} 
                    onBarFinished={handleFinishedBar}
                    isAutoSwitchOn={autoSwitchState}
                />
                <PlaylistPicker 
                    onSelectedPlaylistChange={handleSelectedPlaylistChanged} 
                    onSelectedSettingsChanged={handleSelectedSettingsChanged} 
                    forcePlaylistRefresh={forcePlaylistRefresh} 
                    onPlaylistRefreshed={() => {
                        setForcePlaylistRefresh(false);
                    }}
                    refreshPlaylist={() => {
                        setForcePlaylistRefresh(!forcePlaylistRefresh);
                    }}
                    barCount={barCount}
                    onAutoSwitchToggle={handleAutoSwitchToggle}
                />
            </div>
        </div>
    );
}

export default Main;
