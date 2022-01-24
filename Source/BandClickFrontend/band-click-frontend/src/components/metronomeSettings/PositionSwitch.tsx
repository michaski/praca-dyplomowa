import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    return (
        <>
            <ButtonGroup className="me-1" vertical size="sm">
                <Button className="mb-1" onClick={e => moveUp()}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </Button>
                <Button onClick={e => moveDown()}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </ButtonGroup>
        </>
    );
}

export default PositionSwitch;
