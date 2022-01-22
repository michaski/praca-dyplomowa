import React from "react";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { Playlist } from "../../../../models/Playlists/Playlist";
import { useAction } from "../../../../hooks/useAction";
import { PlaylistStoreService } from "../../../../services/playlists/playlistStoreService";
import PlaylistService from "../../../../services/playlists/playlistService";
import { useSelector } from "react-redux";
import authSelector from "../../../../store/selectors/auth.selector";

interface SharedPlaylistItemProps {
    playlist: Playlist,
    onItemDeleted: Function
}

const SharedPlaylistItem: React.FC<SharedPlaylistItemProps> = ({playlist, onItemDeleted}) => {
    const history = useHistory();
    const playlistStoreActions = useAction(PlaylistStoreService);
    const user = useSelector(authSelector.getUser);

    const loadPlaylist = () => {
        playlistStoreActions.setSelectedPlaylist(playlist);
        history.push('/app');
    }

    const deleteItem = () => {
        PlaylistService.removeFromSharedInApp(playlist.id)
        .then(_ => {
            onItemDeleted();
        });
    }

    return (
    <>
    <ListGroup.Item className="shared-item">
        <Row>
            <Col sm="10">
                <h3>{playlist.name}</h3>
                <Row>
                    <ul className="item-info">
                        <li>Autor: {playlist.author}</li>
                        <li>Data dodania: {new Date(playlist.created).toLocaleDateString()}</li>
                        <li><FontAwesomeIcon icon={faThumbsUp} /> {playlist.positiveRaitingCount}</li>
                        <li><FontAwesomeIcon icon={faThumbsDown} /> {playlist.negativeRaitingCount}</li>
                        <li>Komentarze: {playlist.commentsCount}</li>
                    </ul>
                </Row>
            </Col>
            <Col sm="2" className="d-flex align-items-center">
                <ButtonGroup size="sm">
                    <Button variant="secondary" onClick={() => {history.push(`/shared/playlist/${playlist.id}`);}}>Szczegóły</Button>
                    <Button onClick={loadPlaylist}>Wczytaj</Button>
                    {
                        user && user.systemRole === 'Admin' &&
                        <Button variant="danger" onClick={deleteItem}>Usuń</Button>
                    }
                </ButtonGroup>
            </Col>
        </Row>
    </ListGroup.Item>
    </>
    );
}

export default SharedPlaylistItem;
