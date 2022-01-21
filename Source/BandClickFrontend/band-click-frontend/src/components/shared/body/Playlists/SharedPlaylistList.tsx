import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { PagedPlaylists } from "../../../../models/Playlists/PagedPlaylists";
import PlaylistService from "../../../../services/playlists/playlistService";
import SharedPlaylistItem from "./SharedPlaylistItem";

interface SharedPlaylistListProps {
    visible: boolean
}

const SharedPlaylistList: React.FC<SharedPlaylistListProps> = ({visible}) => {

    const [isActive, setIsActive] = useState(false);
    const [playlists, setPlaylists] = useState({} as PagedPlaylists);

    useEffect(() => {
        setIsActive(visible);
        if (visible) {
            fetchPlaylists();
        }
    }, [visible]);

    const fetchPlaylists = () => {
        PlaylistService.getAllShared()
        .then(result => {
            if (result && result.items.length > 0) {
                setPlaylists(result);
            }
        });
    }

    return (
    <>
    {
        isActive && playlists && playlists.items && playlists.items.length > 0 &&
        <ListGroup variant="flush">
            {
                playlists.items.map((playlist, index) => {
                    return <SharedPlaylistItem key={playlist.id} playlist={playlist} />
                })
            }
        </ListGroup>
    }
    {
        isActive && (!playlists || !playlists.items || playlists.items.length === 0) &&
        <p className="fst-italic">Brak udostępnionych playlist</p>
    }
    </>
    );
}

export default SharedPlaylistList;
