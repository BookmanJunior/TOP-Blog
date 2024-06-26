import { Link, useLocation } from "react-router-dom";
import { ArticleProps } from "../../types/ArticleType";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { UserType } from "../../types/UserType";
import { CommentType } from "../../types/CommentType";
import NoComment from "../../assets/no-comment.png";
import { useEffect, useRef } from "react";

type CommentSectionProps = {
  article: ArticleProps;
  user: UserType | null;
  setArticle: (article: ArticleProps) => void;
};
export default function ArticleComments({
  article,
  setArticle,
  user,
}: CommentSectionProps) {
  const commentSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToCommentSection =
      location.href.indexOf("#commentSection") > -1;

    if (commentSectionRef.current && scrollToCommentSection) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      className="article-comments"
      id="commentSection"
      ref={commentSectionRef}
    >
      <h2 className="comment-count">{article.comments.length} comments</h2>
      {user ? (
        <CommentForm article={article} setArticle={setArticle} />
      ) : (
        <UnAuthorizedLinks />
      )}
      {article.comments.length ? (
        article.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            handleDelete={deleteComment}
          />
        ))
      ) : (
        <NoComments />
      )}
    </section>
  );

  function deleteComment(commentId: string) {
    const updatedComments = article?.comments.map((comment): CommentType => {
      if (comment._id === commentId) {
        comment.deleted = true;
        return comment;
      }
      return comment;
    });
    setArticle({ ...article, comments: updatedComments });
  }
}

function NoComments() {
  return (
    <div className="empty-comments">
      <img src={NoComment} alt="no comment icon" />
      <h2>Be the first to comment</h2>
      <p>
        Nobody's commented on this article yet. Share your thoughts and get the
        conversation going.
      </p>
    </div>
  );
}

function UnAuthorizedLinks() {
  const location = useLocation();
  return (
    <div className="call-to-action">
      Please
      <Link
        to="/login"
        state={{ redirectTo: location.pathname }}
        className="button"
      >
        Login
      </Link>
      or
      <Link
        to="/sign-up"
        className="button"
        state={{ redirectTo: location.pathname }}
      >
        Sign Up
      </Link>
      to comment
    </div>
  );
}
