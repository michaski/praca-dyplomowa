import React from "react";
import { Button, Form, ListGroup, Accordion } from "react-bootstrap";
import Comment from "./Comment";

const CommentList = () => {
    return (
    <>
    <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
            <Accordion.Header><h4 className="text-start">Wszystkie komentarze</h4></Accordion.Header>
            <Accordion.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <Comment />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Comment />
                    </ListGroup.Item>
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    </>
    );
}

export default CommentList;
