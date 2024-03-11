import { Link, useLoaderData, useLocation } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Markdown from "react-markdown";
import { format } from "date-fns";
import "../styles/ArticlePage.scss";
import { UseUser } from "../routes/Root";
import { UserType } from "../types/UserType";

export default function ArticlePage() {
  const { user } = UseUser();
  const article = useLoaderData() as ArticleProps;

  return (
    <main className="article-page">
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <CommentSection article={article} user={user} />
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
      <h1>{article.title}</h1>
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
};

function CommentSection({ article, user }: CommentSectionProps) {
  return (
    <section className="article-comments">
      <h2 className="comment-count">{article.comments.length} comments</h2>
      {user ? <CommentForm articleId={article._id} /> : <UnAuthorizedLinks />}
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
