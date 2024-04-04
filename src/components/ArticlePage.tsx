import { Link, useLocation } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Markdown from "react-markdown";
import { format } from "date-fns";
import "../styles/ArticlePage.scss";
import { UseUser } from "../routes/Root";
import ArticleLoader from "./ArticleLoader";
import { UserType } from "../types/UserType";
import Bookmark from "./BookmarkButton";

export default function ArticlePage() {
  const { user } = UseUser();
  const { article, setArticle, loading } = ArticleLoader();

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <main className="article-page">
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <CommentSection article={article} setArticle={setArticle} user={user} />
    </main>
  );
}

function ArticleHeader({ article }: { article: ArticleProps }) {
  return (
    <header className="article-header">
      <img src={article.cover} />
      <div className="article-author">
        <p>
          By <strong>{article.author.username}</strong>
        </p>
        <span>-</span>
        <p>{format(article.date, "PPP")}</p>
      </div>
      <div className="article-title-wrapper">
        <h1>{article.title}</h1>
        <Bookmark articleId={article._id} />
      </div>
    </header>
  );
}

function ArticleBody({ article }: { article: ArticleProps }) {
  return (
    <section className="article-body">
      <Markdown
        components={{
          h1: "h2",
        }}
      >
        {article.content}
      </Markdown>
    </section>
  );
}

type CommentSectionProps = {
  article: ArticleProps;
  user: UserType | null;
  setArticle: (article: ArticleProps) => void;
};

function CommentSection({ article, setArticle, user }: CommentSectionProps) {
  return (
    <section className="article-comments">
      <h2 className="comment-count">{article.comments.length} comments</h2>
      {user ? (
        <CommentForm article={article} setArticle={setArticle} />
      ) : (
        <UnAuthorizedLinks />
      )}
      {article.comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </section>
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
