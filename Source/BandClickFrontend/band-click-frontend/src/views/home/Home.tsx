import React from 'react';
import Header from '../../components/header/Header';
import { Metronome } from '../../components/metronome/Metronome';
import { MetronomeSettings } from '../../models/MetronomeSettings/MetronomeSettings';

const Home = () => {
    const defaultSettings: MetronomeSettings = {
        tempo: 80,
        metre: {
            beatsPerBar: 4,
            rhythmicUnit: 4,
            accentedBeats: [],
            id: ''
        },
        numberOfMeasures: 4,
        comments: [],
        id: '',
        isShared: false,
        name: '',
        negativeRaitingCount: 0,
        positiveRaitingCouns: 0,
        type: {
            id: '',
            name: ''
        }
    }

    return (
        <div className="container-fluid">
            <Header />
            <Metronome settings={defaultSettings} />
        </div>
    );
}

export default Home;
