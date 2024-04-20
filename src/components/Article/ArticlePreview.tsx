import { Link } from "react-router-dom";
import { ArticleProps } from "../../types/ArticleType";
import Bookmark from "./BookmarkButton";
import ArticleInfo from "./ArticleInfo";
import "../../styles/ArticlePreview.scss";

export default function ArticlePreview({ article }: { article: ArticleProps }) {
  return (
    <article className="article-preview">
      <img src={article.cover} alt={`${article.title} cover`} loading="lazy" />
      <div className="article-preview-wrapper">
        <div className="article-preview-body">
          <Link to={`/articles/${article._id}`}>
            <h2 className="article__title">{article.title}</h2>
          </Link>
          <ArticleInfo
            className="article-preview-info"
            author={article.author.username}
            date={article.date}
          />
        </div>
        <div className="article-preview-footer">
          <Link to={`/category/${article?.category?.title}`}>
            {"#" + article?.category?.title}
          </Link>
          <div>
            <span>{article.comments.length} comments</span>
            <Bookmark articleId={article._id} />
          </div>
        </div>
      </div>
    </article>
  );
}
