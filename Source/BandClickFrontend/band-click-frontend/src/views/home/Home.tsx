import React from 'react';
import Header from '../../components/header/Header';
import { Metronome } from '../../components/metronome/Metronome';

const Home = () => {
    return (
        <div className="container-fluid">
            <Header />
            <Metronome />
        </div>
    );
}

export default Home;
