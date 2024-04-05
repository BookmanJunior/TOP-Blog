import { Link } from "react-router-dom";
import { ArticleProps } from "../../types/ArticleType";
import Bookmark from "../BookmarkButton";
import { format } from "date-fns";
import "../styles/ArticleFeed.scss";

export default function ArticlePreview({ article }: { article: ArticleProps }) {
  return (
    <article className="article">
      <img
        src={article.cover}
        alt={`${article.title} cover`}
        className="article__cover"
        loading="lazy"
      />
      <div className="article__info">
        <Link to={`/articles/${article._id}`}>
          <h2 className="article__title">{article.title}</h2>
        </Link>
        <div>
          <span className="article__author">{article.author.username} - </span>
          <span className="article__date">{format(article.date, "PPP")}</span>
        </div>
        <div className="article-buttons">
          <span>{article.comments.length} comments</span>
          <Bookmark articleId={article._id} />
        </div>
      </div>
    </article>
  );
}
