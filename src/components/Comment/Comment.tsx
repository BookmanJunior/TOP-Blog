import { useState } from "react";
import { CommentType } from "../../types/CommentType";
import FormattedDate from "../FormattedDate";
import "../../styles/Comment.scss";
import { UseUser } from "../../routes/Root";

type handleDelete = (commentId: string) => void;

type CommentProps = {
  comment: CommentType;
  handleDelete: handleDelete;
};

type DeleteButtonProps = {
  commentId: string;
  handleDelete: handleDelete;
};

export default function Comment({ comment, handleDelete }: CommentProps) {
  const { user } = UseUser();
  const [commentState, setCommentState] = useState(1);
  const isOpen = commentState === 1;

  if (comment.deleted) {
    return (
      <div className="comment">
        <p className="comment-author">Deleted</p>
      </div>
    );
  }

  const deleteButton = (
    <CommentDeleteButton commentId={comment._id} handleDelete={handleDelete} />
  );

  return (
    <div className="comment">
      <div className="comment-header">
        <p className="comment-author">{comment.user?.username}</p>
        <FormattedDate
          className="comment-date"
          isTime={true}
          date={comment.date}
        />
        <button
          className="expand-button"
          onClick={() => setCommentState(isOpen ? 0 : 1)}
        ></button>
      </div>
      <div className="comment-body" data-expanded={`${isOpen}`}>
        <div>
          {comment.text}
          {(user?._id === comment.user?._id && deleteButton) ||
            (user?.role === "admin" && deleteButton)}
        </div>
      </div>
    </div>
  );
}

function CommentDeleteButton({ commentId, handleDelete }: DeleteButtonProps) {
  return (
    <form onSubmit={handleSubmit}>
      <button>Delete</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });

      if (res.ok) {
        handleDelete(commentId);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
