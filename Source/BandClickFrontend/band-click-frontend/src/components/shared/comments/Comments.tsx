import React from "react";
import { Container } from "react-bootstrap";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

const Comments = () => {
    return (
    <>
    <Container>
        <h3 className="text-start">Komentarze</h3>
        <AddComment />
        <CommentList />
    </Container>
    </>
    );
}

export default Comments;
