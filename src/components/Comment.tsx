import { format } from "date-fns";
import { UserType } from "../types/UserType";
import { commentType } from "../types/ArticleType";

type CommentProps = commentType & UserType;

export default function Comment({ comment }: { comment: CommentProps }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <p className="comment-author">{comment.user.username}</p>
        <span className="comment-date">{format(comment.date, "MMM d")}</span>
      </div>
      <div className="comment-body">{comment.text}</div>
    </div>
  );
}
