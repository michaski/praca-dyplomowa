import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { OrderByDirection, OrderByValues } from "../../../../models/Filters/QueryFilters";
import { PagedPlaylists } from "../../../../models/Playlists/PagedPlaylists";
import PlaylistService from "../../../../services/playlists/playlistService";
import SharedPlaylistItem from "./SharedPlaylistItem";

interface SharedPlaylistListProps {
    visible: boolean,
    page: number,
    pageSize: number,
    searchPhrase: string,
    orderBy?: OrderByValues,
    orderByDirection?: OrderByDirection,
    onPaginationDataCollected: Function
}

const SharedPlaylistList: React.FC<SharedPlaylistListProps> = ({visible, page, pageSize, searchPhrase, orderBy, orderByDirection, onPaginationDataCollected}) => {

    const [isActive, setIsActive] = useState(false);
    const [playlists, setPlaylists] = useState({} as PagedPlaylists);

    useEffect(() => {
        setIsActive(visible);
        if (visible) {
            fetchPlaylists();
        }
    }, [visible, page, searchPhrase, orderBy, orderByDirection]);

    const fetchPlaylists = () => {
        PlaylistService.getAllShared({
            search: searchPhrase === '' ? undefined : searchPhrase,
            orderBy: (orderByDirection && !orderBy) ? OrderByValues.DEFAULT : orderBy,
            orderByDirection: (orderBy && !orderByDirection) ? OrderByDirection.DEFAULT : orderByDirection,
            page: page,
            pageSize: pageSize
        })
        .then(result => {
            if (result && result.items.length >= 0) {
                setPlaylists(result);
                onPaginationDataCollected(result.totalPages, result.itemsFrom, result.itemsTo, result.totalItemsCount);
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
                    return <SharedPlaylistItem key={playlist.id} playlist={playlist} onItemDeleted={fetchPlaylists} />
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
