import { ArticleProps } from "../../types/ArticleType";
import Bookmark from "./BookmarkButton";
import ArticleInfo from "./ArticleInfo";

export default function ArticleHeader({ article }: { article: ArticleProps }) {
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
