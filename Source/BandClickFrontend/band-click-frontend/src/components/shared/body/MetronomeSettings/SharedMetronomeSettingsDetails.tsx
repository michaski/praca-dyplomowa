import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useAction } from "../../../../hooks/useAction";
import { MetronomeSettings } from "../../../../models/MetronomeSettings/MetronomeSettings";
import MetronomeSettingsService from "../../../../services/metronomeSettings/metronomeSettingsService";
import { MetronomeSettingsStoreSerivce } from "../../../../services/metronomeSettings/metronomeSettingsStoreService";
import authSelector from "../../../../store/selectors/auth.selector";
import AddComment from "../../comments/AddComment";
import Comments from "../../comments/Comments";
import RaitingButtons from "../raitings/RatingButtons";
import "../sharedItem.css";

interface SharedMetronomeSettingsDetailsProps {
    id: string
}

const SharedMetronomeSettingsDetails: React.FC<SharedMetronomeSettingsDetailsProps> = ({id}) => {

    const history = useHistory();
    const [metronomeSettingsData, setMetronomeSettingsData] = useState({} as MetronomeSettings);
    const [stateChanged, setStateChanged] = useState(false);
    const metronomeSettingsStoreActions = useAction(MetronomeSettingsStoreSerivce);
    const user = useSelector(authSelector.getUser);

    useEffect(() => {
        fetchSettingsData();
    }, [id, stateChanged]);

    const fetchSettingsData = () => {
        MetronomeSettingsService.getById(id)
        .then(result => {
            if (result && result.id) {
                setMetronomeSettingsData(result);
                setStateChanged(false);
            }
        });
    }

    const loadMetronomeSettings = () => {
        metronomeSettingsStoreActions.loadSettings(metronomeSettingsData);
        history.push('/app');
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
        MetronomeSettingsService.removeFromSharedInApp(id)
        .then(_ => {
            history.push('/shared');
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
        <h1 className="mt-4">
            <span ><span className="px-4">{metronomeSettingsData.name}</span></span>
        </h1>
        <ul className="item-details-info underlined mb-4 pb-2">
            <li>
                <span className="item-info-label">Autor:</span>
                <span>{metronomeSettingsData.author}</span>
            </li>
            <li>
                <span className="item-info-label">Data dodania:</span>
                <span>{new Date(metronomeSettingsData.created).toLocaleDateString()}</span>
            </li>
            <li>
                <Button size="sm" onClick={loadMetronomeSettings}>Wczytaj</Button>
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
                    <RaitingButtons
                        subject="metronomeSettings"
                        subjectId={metronomeSettingsData.id}
                        positiveRaitingCount={metronomeSettingsData.positiveRaitingCount}
                        negativeRaitingCount={metronomeSettingsData.negativeRaitingCount}
                        onUserHasGivenRaiting={handleUserHasGivenRaiting} />
                </td>
            </tr>
            </tbody>
        </Table>
        <Comments 
            subject="metronomeSettings"
            subjectId={metronomeSettingsData.id}
            comments={metronomeSettingsData.comments} 
            commentsCount={metronomeSettingsData.commentsCount}
            onCommentAdded={handleCommentAdded}
            onCommentDeleted={handleCommentDeleted} />
        </>
    }
    <Button variant="secondary" className="my-4" onClick={() => {history.push('/shared');}}>Powrót</Button>
    </>
    );
}

export default SharedMetronomeSettingsDetails;
