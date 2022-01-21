import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { Playlist } from "../../../../models/Playlists/Playlist";
import PlaylistService from "../../../../services/playlists/playlistService";
import Comments from "../../comments/Comments";
import SharedPlaylistItemsList from "./SharedPlaylistItemsList";

interface SharedPlaylistDetailsProps {
    id: string
}

const SharedPlaylistDetails: React.FC<SharedPlaylistDetailsProps> = ({id}) => {

    const history = useHistory();
    const [playlistData, setPlaylistData] = useState({} as Playlist);
    const [stateChanged, setStateChanged] = useState(false);

    useEffect(() => {
        fetchPlaylistData();
    }, [id, stateChanged]);

    const fetchPlaylistData = () => {
        PlaylistService.getById(id)
        .then(result => {
            if (result && result.id) {
                setPlaylistData(result);
            }
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
        <h2>{playlistData.name}</h2>
        <ul className="item-details-info">
            <li>
                <span className="item-info-label">Autor:</span>
                <span>{playlistData.author}</span>
            </li>
            <li>
                <span className="item-info-label">Data dodania:</span>
                <span>{new Date(playlistData.created).toLocaleDateString()}</span>
            </li>
            <li>
                <Button size="sm">Wczytaj</Button>
            </li>
        </ul>
        <Table responsive="md" borderless className="d-flex justify-content-center">
            <tbody>
            <tr>
                <td className="item-info-label">Oceny:</td>
                <td className="item-info-data">
                    <span>
                        <Button variant="outline-info" size="sm"><FontAwesomeIcon icon={faThumbsUp} /></Button> {playlistData.positiveRaitingCount}
                    </span>
                    <span>
                        <Button variant="outline-danger" size="sm"><FontAwesomeIcon icon={faThumbsDown} /></Button> {playlistData.negativeRaitingCount}
                    </span>
                </td>
            </tr>
            </tbody>
        </Table>
        <SharedPlaylistItemsList metronomeSettings={playlistData.metronomeSettings} />
        <Comments comments={playlistData.comments} commentsCount={playlistData.commentsCount} />
        </>
    }
    <Button onClick={() => {history.push('/shared');}}>Powrót</Button>
    </>
    );
}

export default SharedPlaylistDetails;
