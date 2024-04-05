import { format } from "date-fns";
import { useState } from "react";
import { CommentType } from "../../types/CommentType";
import "../../styles/Comment.scss";

export default function Comment({ comment }: { comment: CommentType }) {
  const [commentState, setCommentState] = useState(1);
  const isOpen = commentState === 1;

  if (comment.deleted) {
    return (
      <div className="comment">
        <p className="comment-author">Deleted</p>
      </div>
    );
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <p className="comment-author">{comment.user?.username}</p>
        <span className="comment-date">{format(comment.date, "MMM d")}</span>
        <button onClick={() => setCommentState(isOpen ? 0 : 1)}></button>
      </div>
      <div className="comment-body" data-expanded={`${isOpen}`}>
        <div>{comment.text}</div>
      </div>
    </div>
  );
}
