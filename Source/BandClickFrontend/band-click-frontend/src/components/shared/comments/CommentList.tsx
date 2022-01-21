import React from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import Comment from "./Comment";

const CommentList = () => {
    return (
    <>
    <h4 className="text-start">Wszystkie komentarze</h4>
    <ListGroup>
        <ListGroup.Item>
            <Comment />
        </ListGroup.Item>
        <ListGroup.Item>
            <Comment />
        </ListGroup.Item>
    </ListGroup>
    </>
    );
}

export default CommentList;
