import React from "react";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { Metronome } from "../../components/metronome/Metronome";
import Playlist from "../../components/playlist/Playlist";

const Main = (props: any) => {
    return (
        <div>
            <LoggedInHeader />
            <div className="row">
                <Metronome />
                <Playlist />
            </div>
        </div>
    );
}

export default Main;
