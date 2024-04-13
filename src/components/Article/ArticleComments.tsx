import { Link, useLocation } from "react-router-dom";
import { ArticleProps } from "../../types/ArticleType";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { UserType } from "../../types/UserType";
import { CommentType } from "../../types/CommentType";

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
  return (
    <section className="article-comments">
      <h2 className="comment-count">{article.comments.length} comments</h2>
      {user ? (
        <CommentForm article={article} setArticle={setArticle} />
      ) : (
        <UnAuthorizedLinks />
      )}
      {article.comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          handleDelete={deleteComment}
        />
      ))}
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
