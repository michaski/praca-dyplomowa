import React, { useState } from "react";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { Metronome } from "../../components/metronome/Metronome";
import PlaylistPicker from "../../components/playlist/PlaylistPicker";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { metronomeSettingsInitialState } from "../../store/reducers/metronomeSettings.reducer";

const Main = (props: any) => {
    const [selectedSettings, setSelectedSettings] = useState(metronomeSettingsInitialState);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [forcePlaylistRefresh, setForcePlaylistRefresh] = useState(false);

    const handleSelectedSettingsChanged = (settings: MetronomeSettings) => {
        setSelectedSettings(settings);
    }

    const handleSelectedPlaylistChanged = (playlistId: string) => {
        setSelectedPlaylistId(playlistId);
    }

    return (
        <div className="containter-fluid">
            <LoggedInHeader />
            <div className="row">
                <Metronome settings={selectedSettings} playlistId={selectedPlaylistId} onSettingsAdded={() => setForcePlaylistRefresh(true)} />
                <PlaylistPicker onSelectedPlaylistChange={handleSelectedPlaylistChanged} onSelectedSettingsChanged={handleSelectedSettingsChanged} forcePlaylistRefresh={forcePlaylistRefresh} onPlaylistRefreshed={() => {
                    setForcePlaylistRefresh(false);
                }} />
            </div>
        </div>
    );
}

export default Main;
