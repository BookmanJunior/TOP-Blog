import { useLoaderData } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "../styles/ArticlePage.scss";

export default function ArticlePage() {
  const article = useLoaderData() as ArticleProps;
  return (
    <div className="article-page">
      <header className="article-header">
        <img src={article.cover} />
        <h1>{article.title}</h1>
      </header>
      <div className="article-body">{article.content}</div>
      <div className="article-comments">
        <CommentForm articleId={article._id} />
        {article.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
