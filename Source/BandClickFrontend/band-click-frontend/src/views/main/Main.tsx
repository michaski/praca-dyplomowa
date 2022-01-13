import React, { useState } from "react";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { Metronome } from "../../components/metronome/Metronome";
import PlaylistPicker from "../../components/playlist/PlaylistPicker";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";

const Main = (props: any) => {
    const [selectedSettings, setSelectedSettings] = useState({
            tempo: 80,
            metre: {
                beatsPerBar: 4,
                rhythmicUnit: 4
            },
            numberOfMeasures: 4
        } as unknown as MetronomeSettings);

    const handleSelectedSettingsChanged = (settings: MetronomeSettings) => {
        setSelectedSettings(settings);
    }

    return (
        <div className="containter-fluid">
            <LoggedInHeader />
            <div className="row">
                <Metronome settings={selectedSettings} />
                <PlaylistPicker onSelectedSettingsChanged={handleSelectedSettingsChanged} />
            </div>
        </div>
    );
}

export default Main;
