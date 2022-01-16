import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { MetronomeSettings } from "../../models/MetronomeSettings/MetronomeSettings";
import { Playlist } from "../../models/Playlists/Playlist";
import MetronomeSettingsService from "../../services/metronomeSettings/metronomeSettingsService";

interface PositionSwitchProps {
    playlist: Playlist,
    metronomeSettings: MetronomeSettings,
    moveUp: Function,
    moveDown: Function,
    onPositionChanged: Function
}

const PositionSwitch: React.FC<PositionSwitchProps> = ({ playlist, metronomeSettings, moveUp, moveDown, onPositionChanged }) => { 
    const [settingsToMove, setSettingsToMove] = useState(metronomeSettings);
    const [currentPlaylist, setPlaylist] = useState(playlist);

    useEffect(() => {
        setSettingsToMove(metronomeSettings);
        setPlaylist(playlist);
    }, [metronomeSettings, playlist]);

    // const moveUp = () => {
    //     const settingsState = settingsToMove;
    //     const playlistState = currentPlaylist;
    //     console.log(`Moving up ${settingsState.id}`);
    //     MetronomeSettingsService.moveUpInPlaylist(
    //         settingsState.id,
    //         playlistState.id)
    //         .then(_ => {
    //             onPositionChanged();
    //         });
    // }

    // const moveDown = () => {
    //     MetronomeSettingsService.moveDownInPlaylist(
    //         settingsToMove.id,
    //         currentPlaylist.id)
    //         .then(_ => {
    //             onPositionChanged();
    //         });
    // }

    return (
        <>
            <ButtonGroup vertical size="sm">
                <Button onClick={e => moveUp()}>&#9650;</Button>
                <Button onClick={e => moveDown()}>&#9660;</Button>
            </ButtonGroup>
        </>
    );
}

export default PositionSwitch;
