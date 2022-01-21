import React from "react";
import { Container } from "react-bootstrap";
import { CommentInfo } from "../../../models/Comments/Comment";
import AddComment from "./AddComment";

interface CommentComponentProps {
    comment: CommentInfo
}

const CommentComponent: React.FC<CommentComponentProps> = ({comment}) => {
    return (
    <>
    <Container className="text-start">
        <p>{comment.createdBy}</p>
        <p>{comment.text}</p>
    </Container>
    </>
    );
}

export default CommentComponent;
