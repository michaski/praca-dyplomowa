import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { OrderByDirection, OrderByValues } from "../../../../models/Filters/QueryFilters";
import { PagedPlaylists } from "../../../../models/Playlists/PagedPlaylists";
import PlaylistService from "../../../../services/playlists/playlistService";
import SharedPlaylistItem from "./SharedPlaylistItem";

interface SharedPlaylistListProps {
    visible: boolean,
    searchPhrase: string,
    orderBy?: OrderByValues,
    orderByDirection?: OrderByDirection
}

const SharedPlaylistList: React.FC<SharedPlaylistListProps> = ({visible, searchPhrase, orderBy, orderByDirection}) => {

    const [isActive, setIsActive] = useState(false);
    const [playlists, setPlaylists] = useState({} as PagedPlaylists);

    useEffect(() => {
        setIsActive(visible);
        if (visible) {
            fetchPlaylists();
        }
    }, [visible, searchPhrase, orderBy, orderByDirection]);

    const fetchPlaylists = () => {
        PlaylistService.getAllShared({
            search: searchPhrase === '' ? undefined : searchPhrase,
            orderBy: (orderByDirection && !orderBy) ? OrderByValues.DEFAULT : orderBy,
            orderByDirection: (orderBy && !orderByDirection) ? OrderByDirection.DEFAULT : orderByDirection
        })
        .then(result => {
            if (result && result.items.length >= 0) {
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
