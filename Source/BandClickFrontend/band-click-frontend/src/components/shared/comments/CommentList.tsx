import React from "react";
import { Button, Form, ListGroup, Accordion } from "react-bootstrap";
import { CommentInfo } from "../../../models/Comments/Comment";
import CommentComponent from "./CommentComponent";

interface CommentListProps {
    comments: CommentInfo[],
    commentsCount: number
}

const CommentList: React.FC<CommentListProps> = ({comments, commentsCount}) => {
    return (
    <>
    {
        comments && comments.length > 0 &&
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header><h4 className="text-start">Wszystkie komentarze ({comments.length})</h4></Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        {
                            comments && comments.length > 0 && 
                            comments.map((comment, index) => {
                                return (
                                <>
                                <ListGroup.Item key={comment.id}>
                                    <CommentComponent comment={comment} />
                                </ListGroup.Item>
                                </>
                                );
                            })
                        }
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    }
    {
        (!comments || comments.length === 0) &&
        <p className="fst-italic">Brak komentarzy</p>
    }
    </>
    );
}

export default CommentList;
