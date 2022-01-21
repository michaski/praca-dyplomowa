import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { MetronomeSettings } from "../../../../models/MetronomeSettings/MetronomeSettings";
import MetronomeSettingsService from "../../../../services/metronomeSettings/metronomeSettingsService";
import AddComment from "../../comments/AddComment";
import Comments from "../../comments/Comments";
import "../sharedItem.css";

interface SharedMetronomeSettingsDetailsProps {
    id: string
}

const SharedMetronomeSettingsDetails: React.FC<SharedMetronomeSettingsDetailsProps> = ({id}) => {

    const history = useHistory();
    const [metronomeSettingsData, setMetronomeSettingsData] = useState({} as MetronomeSettings);
    const [stateChanged, setStateChanged] = useState(false);

    useEffect(() => {
        fetchSettingsData();
    }, [id, stateChanged]);

    const fetchSettingsData = () => {
        MetronomeSettingsService.getById(id)
        .then(result => {
            if (result && result.id) {
                setMetronomeSettingsData(result);
            }
        });
    }

    return (
    <>
    {
        (!metronomeSettingsData || !metronomeSettingsData.id) &&
        <>
        <h2>Nie znaleziono</h2>
        <p>Nie znaleziono wybranej pozycji lub została ona usunięta</p>
        </>
    }
    {
        metronomeSettingsData && metronomeSettingsData.id &&
        <>
        <h2>{metronomeSettingsData.name}</h2>
        <ul className="item-details-info">
            <li>
                <span className="item-info-label">Autor:</span>
                <span>{metronomeSettingsData.author}</span>
            </li>
            <li>
                <span className="item-info-label">Data dodania:</span>
                <span>{new Date(metronomeSettingsData.created).toLocaleDateString()}</span>
            </li>
            <li>
                <Button size="sm">Wczytaj</Button>
            </li>
        </ul>
        <Table responsive="md" borderless className="d-flex justify-content-center">
            <tbody>
            <tr>
                <td className="item-info-label">Tempo:</td>
                <td className="item-info-data">{metronomeSettingsData.tempo} Bpm</td>
            </tr>
            <tr>
                <td className="item-info-label">Metrum:</td>
                <td className="item-info-data">{metronomeSettingsData.metre.beatsPerBar}/{metronomeSettingsData.metre.rhythmicUnit}</td>
            </tr>
            <tr>
                <td className="item-info-label">Typ:</td>
                <td className="item-info-data">{metronomeSettingsData.type.name}</td>
            </tr>
            <tr>
                <td className="item-info-label">Oceny:</td>
                <td className="item-info-data">
                    <span>
                        <Button variant="outline-info" size="sm"><FontAwesomeIcon icon={faThumbsUp} /></Button> {metronomeSettingsData.positiveRaitingCount}
                    </span>
                    <span>
                        <Button variant="outline-danger" size="sm"><FontAwesomeIcon icon={faThumbsDown} /></Button> {metronomeSettingsData.negativeRaitingCount}
                    </span>
                </td>
            </tr>
            </tbody>
        </Table>
        <Comments comments={metronomeSettingsData.comments} commentsCount={metronomeSettingsData.commentsCount} />
        </>
    }
    <Button onClick={() => {history.push('/shared');}}>Powrót</Button>
    </>
    );
}

export default SharedMetronomeSettingsDetails;
