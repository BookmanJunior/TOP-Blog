import { format } from "date-fns";
import { UserType } from "../types/UserType";
import { commentType } from "../types/ArticleType";
import { useState } from "react";
import "../styles/Comment.scss";

type CommentProps = commentType & UserType;

export default function Comment({ comment }: { comment: CommentProps }) {
  const [commentState, setCommentState] = useState(1);
  const isOpen = commentState === 1;

  return (
    <div className="comment">
      <div className="comment-header">
        <p className="comment-author">{comment.user.username}</p>
        <span className="comment-date">{format(comment.date, "MMM d")}</span>
        <button onClick={() => setCommentState(isOpen ? 0 : 1)}></button>
      </div>
      <div className="comment-body" data-expanded={`${isOpen}`}>
        <div>{comment.text}</div>
      </div>
    </div>
  );
}
