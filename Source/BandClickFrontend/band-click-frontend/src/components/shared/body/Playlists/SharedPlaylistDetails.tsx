import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table, Button, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import Comments from "../../comments/Comments";
import SharedPlaylistItemsList from "./SharedPlaylistItemsList";

const SharedPlaylistDetails = () => {
    const history = useHistory();

    return (
    <>
    <h2>Nazwa playlisty</h2>
    <ul className="item-details-info">
        <li>
            <span className="item-info-label">Autor:</span>
            <span>XYZ</span>
        </li>
        <li>
            <span className="item-info-label">Data dodania:</span>
            <span>20.01.2022</span>
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
                    <Button variant="outline-info" size="sm"><FontAwesomeIcon icon={faThumbsUp} /></Button> 15
                </span>
                <span>
                    <Button variant="outline-danger" size="sm"><FontAwesomeIcon icon={faThumbsDown} /></Button> 4
                </span>
            </td>
        </tr>
        </tbody>
    </Table>
    <SharedPlaylistItemsList />
    <Comments />
    <Button onClick={() => {history.push('/shared');}}>Powrót</Button>
    </>
    );
}

export default SharedPlaylistDetails;
