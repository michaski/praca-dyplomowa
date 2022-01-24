import React, { useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { Metronome } from "../../components/metronome/Metronome";
import PlaylistPicker from "../../components/playlist/PlaylistPicker";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { metronomeSettingsInitialState } from "../../store/reducers/metronomeSettings.reducer";

interface MainRouteParams {
    bandId?: string,
    playlistId?: string
} 

const Main = (props: any) => {
    const [selectedSettings, setSelectedSettings] = useState(metronomeSettingsInitialState);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [forcePlaylistRefresh, setForcePlaylistRefresh] = useState(false);
    const [barCount, setBarCount] = useState(0);
    const [autoSwitchState, setAutoSwitchState] = useState(false);
    const { bandId, playlistId } = useParams<MainRouteParams>();

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
                <Col md="8">
                    <Metronome 
                        settings={selectedSettings} 
                        playlistId={selectedPlaylistId} 
                        onSettingsAdded={() => setForcePlaylistRefresh(true)} 
                        onBarFinished={handleFinishedBar}
                        isAutoSwitchOn={autoSwitchState}
                    />
                </Col>
                <Col md="4">
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
                        bandId={bandId}
                        playlistId={playlistId}
                    />
                </Col>
            </div>
        </div>
    );
}

export default Main;
