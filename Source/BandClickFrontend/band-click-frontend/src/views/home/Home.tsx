import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { Metronome } from '../../components/metronome/Metronome';
import { MetronomeSettings } from '../../models/MetronomeSettings/MetronomeSettings';
import { metronomeSettingsInitialState } from '../../store/reducers/metronomeSettings.reducer';

const Home = () => {
    return (
        <div className="container-fluid">
            <Header />
            <Container>
                <Metronome settings={metronomeSettingsInitialState} onBarFinished={() => {}} isAutoSwitchOn={false} />
            </Container>
        </div>
    );
}

export default Home;
