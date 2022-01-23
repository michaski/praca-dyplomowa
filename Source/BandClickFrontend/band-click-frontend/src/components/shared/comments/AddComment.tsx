import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MetronomeSettingsService from "../../../services/metronomeSettings/metronomeSettingsService";
import PlaylistService from "../../../services/playlists/playlistService";

interface AddCommentProps {
    subject: string,
    subjectId: string,
    onCommentAdded: Function
}

const AddComment: React.FC<AddCommentProps> = ({subject, subjectId, onCommentAdded}) => {

    const [commentText, setCommentText] = useState('');

    const addComment = () => {
        if (subject === 'metronomeSettings') {
            MetronomeSettingsService.addComment({
                metronomeSettingsId: subjectId,
                text: commentText
            }).then(_ => {
                onCommentAdded();
            });
        } else if (subject === 'playlist') {
            PlaylistService.addComment({
                playlistId: subjectId,
                text: commentText
            }).then(_ => {
                onCommentAdded();
            });
        }
    }

    return (
    <>
    <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="d-flex">Dodaj komentarz</Form.Label>
        <Form.Control className="mb-2" as="textarea" placeholder="Treść komentarza..." onChange={e => {
            setCommentText(e.target.value);
        }} />
        <Button onClick={addComment}>Dodaj</Button>
    </Form.Group>
    </>
    );
}

export default AddComment;
