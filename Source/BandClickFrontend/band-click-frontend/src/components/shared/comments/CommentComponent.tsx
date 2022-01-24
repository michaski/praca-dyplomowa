import React, { useState } from "react";
import { Button, ButtonGroup, Container, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CommentInfo } from "../../../models/Comments/Comment";
import MetronomeSettingsService from "../../../services/metronomeSettings/metronomeSettingsService";
import PlaylistService from "../../../services/playlists/playlistService";
import authSelector from "../../../store/selectors/auth.selector";
import AddComment from "./AddComment";

interface CommentComponentProps {
    comment: CommentInfo,
    subject: string, 
    onCommentDeleted: Function
}

const CommentComponent: React.FC<CommentComponentProps> = ({comment, subject, onCommentDeleted}) => {

    const user = useSelector(authSelector.getUser);
    const [showModal, setShowModal] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);

    const openModal = () => {
        setShowModal(true);
    }

    const onHide = () => {
        setShowModal(false);
    }

    const onSave = () => {
        if (subject === 'metronomeSettings') {
            MetronomeSettingsService.editComment({
                id: comment.id,
                text: commentText
            })
            .then(response => {
                if (response !== null) {
                    onCommentDeleted();
                }
            });
        } else if (subject === 'playlist') {
            PlaylistService.editComment({
                id: comment.id,
                text: commentText
            })
            .then(response => {
                if (response !== null) {
                    onCommentDeleted();
                }
            });
        }
        setShowModal(false);
    }

    const deleteComment = () => {
        if (subject === 'metronomeSettings') {
            MetronomeSettingsService.deleteComment(comment.id)
            .then(response => {
                if (response !== null) {
                    onCommentDeleted();
                }
            });
        } else if (subject === 'playlist') {
            PlaylistService.deleteComment(comment.id)
            .then(response => {
                if (response !== null) {
                    onCommentDeleted();
                }
            });
        }
    }

    return (
    <>
    <Container className="text-start">
        <p className="fw-bold mt-2 mb-1">{comment.author}</p>
        <p className="ms-2 mb-2">{comment.text}</p>
        {
            user && (user.username === comment.author || user.systemRole === 'Admin') &&
            <>
            <ButtonGroup className="ms-2 mb-2" size="sm">
                <Button className="me-2" variant="warning" onClick={openModal}>Edytuj</Button>
                <Button variant="danger" onClick={deleteComment}>Usuń</Button>
            </ButtonGroup>
            <Modal
                show={showModal}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edytuj komentarz
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form.Label>Treść komentarza:</Form.Label>
                        <Form.Control as="textarea" defaultValue={comment.text} onChange={e => {
                            setCommentText(e.target.value);
                        }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={onHide}>Anuluj</Button>
                    <Button className="btn btn-primary" onClick={onSave}>Zapisz</Button>
                </Modal.Footer>
            </Modal>
            </>
        }
    </Container>
    </>
    );
}

export default CommentComponent;
