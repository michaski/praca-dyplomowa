import React from "react";
import { ListGroup } from "react-bootstrap";
import SharedPlaylistItem from "./SharedPlaylistItem";

const SharedPlaylistList = () => {
    return (
    <>
    <ListGroup variant="flush">
        <SharedPlaylistItem />
        <SharedPlaylistItem />
        <SharedPlaylistItem />
    </ListGroup>
    </>
    );
}

export default SharedPlaylistList;
