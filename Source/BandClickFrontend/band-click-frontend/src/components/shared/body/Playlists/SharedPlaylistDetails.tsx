import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useAction } from "../../../../hooks/useAction";
import { Playlist } from "../../../../models/Playlists/Playlist";
import auth from "../../../../services/auth/auth";
import PlaylistService from "../../../../services/playlists/playlistService";
import { PlaylistStoreService } from "../../../../services/playlists/playlistStoreService";
import authSelector from "../../../../store/selectors/auth.selector";
import Comments from "../../comments/Comments";
import RaitingButtons from "../raitings/RatingButtons";
import SharedPlaylistItemsList from "./SharedPlaylistItemsList";

interface SharedPlaylistDetailsProps {
    id: string
}

const SharedPlaylistDetails: React.FC<SharedPlaylistDetailsProps> = ({id}) => {

    const history = useHistory();
    const [playlistData, setPlaylistData] = useState({} as Playlist);
    const [stateChanged, setStateChanged] = useState(false);
    const playlistStoreActions = useAction(PlaylistStoreService);
    const user = useSelector(authSelector.getUser);

    useEffect(() => {
        fetchPlaylistData();
    }, [id, stateChanged]);

    const fetchPlaylistData = () => {
        PlaylistService.getById(id)
        .then(result => {
            if (result && result.id) {
                setPlaylistData(result);
                setStateChanged(false);
            }
        });
    }

    const loadPlaylist = () => {
        playlistStoreActions.setSelectedPlaylist(playlistData);
        if (auth.getToken() !== '') {
            history.push('/app');
        } else {
            history.push('/');
        }
    }

    const handleUserHasGivenRaiting = () => {
        setStateChanged(true);
    }

    const handleCommentAdded = () => {
        setStateChanged(true);
    }

    const handleCommentDeleted = () => {
        setStateChanged(true);
    }

    const deleteItem = () => {
        PlaylistService.removeFromSharedInApp(id)
        .then(_ => {
            history.push('/shared');
        });
    }

    return (
    <>
    {
        (!playlistData || !playlistData.id) &&
        <>
        <h2>Nie znaleziono</h2>
        <p>Nie znaleziono wybranej pozycji lub została ona usunięta</p>
        </>
    }
    {
        playlistData && playlistData.id &&
        <>
        <h1 className="mt-4">
            <span ><span className="px-4">{playlistData.name}</span></span>
        </h1>
        <ul className="item-details-info underlined mb-4 pb-2">
            <li>
                <span className="item-info-label">Autor:</span>
                <span>{playlistData.author}</span>
            </li>
            <li>
                <span className="item-info-label">Data dodania:</span>
                <span>{new Date(playlistData.created).toLocaleDateString()}</span>
            </li>
            <li>
                <Button size="sm" onClick={loadPlaylist}>Wczytaj</Button>
            </li>
            {
                user && user.systemRole === 'Admin' &&
                <>
                <li>
                    <Button size="sm" variant="danger" onClick={deleteItem}>Usuń</Button>
                </li>
                </>
            }
        </ul>
        <Table responsive="md" borderless className="d-flex justify-content-center">
            <tbody>
            <tr>
                <td className="item-info-label">Oceny:</td>
                <td className="item-info-data">
                    <RaitingButtons
                        subject="playlist"
                        subjectId={playlistData.id}
                        positiveRaitingCount={playlistData.positiveRaitingCount}
                        negativeRaitingCount={playlistData.negativeRaitingCount}
                        onUserHasGivenRaiting={handleUserHasGivenRaiting} />
                </td>
            </tr>
            </tbody>
        </Table>
        <SharedPlaylistItemsList metronomeSettings={playlistData.metronomeSettings} />
        <Comments 
            subject="playlist"
            subjectId={playlistData.id}
            comments={playlistData.comments} 
            commentsCount={playlistData.commentsCount}
            onCommentAdded={handleCommentAdded}
            onCommentDeleted={handleCommentDeleted} />
        </>
    }
    <Button variant="secondary" className="my-4" onClick={() => {history.push('/shared');}}>Powrót</Button>
    </>
    );
}

export default SharedPlaylistDetails;
