import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
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

    const deleteComment = () => {
        if (subject === 'metronomeSettings') {
            MetronomeSettingsService.deleteComment(comment.id)
            .then(_ => {
                onCommentDeleted();
            });
        } else if (subject === 'playlist') {
            PlaylistService.deleteComment(comment.id)
            .then(_ => {
                onCommentDeleted();
            });
        }
    }

    return (
    <>
    <Container className="text-start">
        <p>{comment.author}</p>
        <p>{comment.text}</p>
        {
            user && (user.username === comment.author || user.systemRole === 'Admin') &&
            <ButtonGroup size="sm">
                <Button variant="warning">Edytuj</Button>
                <Button variant="danger" onClick={deleteComment}>Usuń</Button>
            </ButtonGroup>
        }
    </Container>
    </>
    );
}

export default CommentComponent;
