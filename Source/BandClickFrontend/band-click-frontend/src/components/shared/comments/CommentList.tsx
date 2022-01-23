import React from "react";
import { Button, Form, ListGroup, Accordion } from "react-bootstrap";
import { CommentInfo } from "../../../models/Comments/Comment";
import CommentComponent from "./CommentComponent";

interface CommentListProps {
    subject: string,
    comments: CommentInfo[],
    commentsCount: number,
    onCommentDeleted: Function
}

const CommentList: React.FC<CommentListProps> = ({subject, comments, commentsCount, onCommentDeleted}) => {
    return (
    <>
    {
        comments && comments.length > 0 &&
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-flush-header"><h4 className="text-start">Wszystkie komentarze ({comments.length})</h4></Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        {
                            comments && comments.length > 0 && 
                            comments.map((comment, index) => {
                                return (
                                <>
                                <ListGroup.Item key={comment.id}>
                                    <CommentComponent 
                                        subject={subject} 
                                        comment={comment}
                                        onCommentDeleted={onCommentDeleted} />
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
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-flush-header"><h4 className="text-start">Wszystkie komentarze (0)</h4></Accordion.Header>
                <Accordion.Body>
                    <p className="fst-italic">Brak komentarzy</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    }
    </>
    );
}

export default CommentList;
