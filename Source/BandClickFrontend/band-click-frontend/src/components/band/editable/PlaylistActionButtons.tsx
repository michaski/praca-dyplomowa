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
        .then(_ => {
            onPlaylistDeleted();
        });
    }

    const handlePlaylistLoad = () => {
        onPlaylistLoad(playlist);
    }

    return (
    <ButtonGroup size="sm">
        <Button onClick={handlePlaylistLoad}>Wczytaj</Button>
        <Button variant="danger" onClick={handleDeletePlaylist}>Usuń z zespołu</Button>
    </ButtonGroup>
    );
}

export default PlaylistActionButtons;