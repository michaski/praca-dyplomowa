import React from "react";
import { Container } from "react-bootstrap";
import { CommentInfo } from "../../../models/Comments/Comment";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

interface CommentsProps {
    comments: CommentInfo[],
    commentsCount: number,
    subject: string,
    subjectId: string,
    onCommentAdded: Function,
    onCommentDeleted: Function
}

const Comments: React.FC<CommentsProps> = ({comments, commentsCount, subject, subjectId, onCommentAdded, onCommentDeleted}) => {
    return (
    <>
    <Container>
        <h3 className="text-start mt-4">Komentarze</h3>
        <AddComment
            subject={subject}
            subjectId={subjectId}
            onCommentAdded={onCommentAdded} />
        <CommentList 
            subject={subject}
            comments={comments} 
            commentsCount={commentsCount}
            onCommentDeleted={onCommentDeleted} />
    </Container>
    </>
    );
}

export default Comments;
