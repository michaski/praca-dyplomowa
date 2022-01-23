import React from 'react';
import { ButtonGroup, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Header from '../../components/header/Header';
import { Metronome } from '../../components/metronome/Metronome';
import { MetronomeSettings } from '../../models/MetronomeSettings/MetronomeSettings';
import { metronomeSettingsInitialState } from '../../store/reducers/metronomeSettings.reducer';

const Home = () => {
    const history = useHistory();

    return (
        <div className="container-fluid px-0">
            <Header />
            <div className="jumbotron bg-cover mb-4">
                <div className="container py-5 text-center">
                    <h1 className="display-4 font-weight-bold">Witaj w Band Click</h1>
                    <p className="mb-0">Ćwicz poczucie rytmu korzystając z naszej aplikacji, dołączaj i twórz swoje zespoły oraz korzystaj z ustawień stworzonych przez naszych użytkowników</p>
                    <p className="mb-1 mt-3 fst-italic">Aby w pełni skorzystać z możliwości aplikacji musisz posiadać konto:</p>
                    <button className="btn btn-primary px-5" onClick={() => history.push('/login')}>Zaloguj się</button>
                    <span className='mx-3'>lub</span>
                    <button className="btn btn-success px-5" onClick={() => history.push('/register')}>Stwórz konto</button>
                </div>
            </div>
            <Container>
                <Metronome settings={metronomeSettingsInitialState} onBarFinished={() => {}} isAutoSwitchOn={false} />
            </Container>
        </div>
    );
}

export default Home;
