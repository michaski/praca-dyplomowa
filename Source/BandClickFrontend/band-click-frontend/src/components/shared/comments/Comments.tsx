import React from "react";
import { Container } from "react-bootstrap";
import { CommentInfo } from "../../../models/Comments/Comment";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

interface CommentsProps {
    comments: CommentInfo[],
    commentsCount: number
}

const Comments: React.FC<CommentsProps> = ({comments, commentsCount}) => {
    return (
    <>
    <Container>
        <h3 className="text-start">Komentarze</h3>
        <AddComment />
        <CommentList comments={comments} commentsCount={commentsCount} />
    </Container>
    </>
    );
}

export default Comments;
