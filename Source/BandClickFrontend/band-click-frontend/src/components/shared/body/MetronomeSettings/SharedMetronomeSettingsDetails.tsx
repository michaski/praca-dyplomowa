import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import AddComment from "../../comments/AddComment";
import Comments from "../../comments/Comments";
import "../sharedItem.css";

const SharedMetronomeSettingsDetails = () => {
    return (
    <>
    <h2>Nazwa ustawienia</h2>
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
            <td className="item-info-label">Tempo:</td>
            <td className="item-info-data">160 Bpm</td>
        </tr>
        <tr>
            <td className="item-info-label">Metrum:</td>
            <td className="item-info-data">4/4</td>
        </tr>
        <tr>
            <td className="item-info-label">Typ:</td>
            <td className="item-info-data">Utwór</td>
        </tr>
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
    <Comments />
    </>
    );
}

export default SharedMetronomeSettingsDetails;
