import { Link, useLocation, useParams } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import Comment from "../components/Comment/Comment";
import CommentForm from "../components/Comment/CommentForm";
import Markdown from "react-markdown";
import { UseUser } from "./Root";
import { UserType } from "../types/UserType";
import Bookmark from "../components/BookmarkButton";
import DataFetch from "../components/DataFetch";
import ArticleInfo from "../components/Article/ArticleInfo";
import "../styles/ArticlePage.scss";

export default function ArticlePage() {
  const { user } = UseUser();
  const { id } = useParams();
  const { data, setData, error, loading } = DataFetch<ArticleProps>(
    `http://localhost:3000/articles/${id}`
  );

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    throw error;
  }

  return (
    data && (
      <main className="article-page">
        <ArticleHeader article={data} />
        <ArticleBody article={data} />
        <CommentSection article={data} setArticle={setData} user={user} />
      </main>
    )
  );
}

function ArticleHeader({ article }: { article: ArticleProps }) {
  return (
    <header className="article-header">
      <img src={article.cover} />
      <div className="article-info-wrapper">
        <ArticleInfo
          className="article-info"
          author={article.author.username}
          date={article.date}
        />
        <div className="article-title-wrapper">
          <h1>{article.title}</h1>
          <Bookmark articleId={article._id} />
        </div>
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
