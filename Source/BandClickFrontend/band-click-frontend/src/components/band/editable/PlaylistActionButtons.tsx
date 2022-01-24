import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Band } from "../../../models/Bands/Band";
import { Playlist } from "../../../models/Playlists/Playlist";
import PlaylistService from "../../../services/playlists/playlistService";

interface PlaylistActionButtonsProps {
    playlist: Playlist,
    band: Band,
    onPlaylistDeleted: Function,
    onPlaylistLoad: Function
}

const PlaylistActionButtons: React.FC<PlaylistActionButtonsProps> = ({playlist, band, onPlaylistDeleted, onPlaylistLoad}) => {

    const handleDeletePlaylist = () => {
        PlaylistService.removeFromBand(playlist.id, band.id)
        .then(response => {
            console.log(response);
            if (response !== null) {
                onPlaylistDeleted();
            }
        });
    }

    const handlePlaylistLoad = () => {
        onPlaylistLoad(playlist);
    }

    return (
    <ButtonGroup size="sm" className="ms-3">
        <Button className="me-2" onClick={handlePlaylistLoad}>Wczytaj</Button>
        <Button variant="danger" onClick={handleDeletePlaylist}>Usuń z zespołu</Button>
    </ButtonGroup>
    );
}

export default PlaylistActionButtons;