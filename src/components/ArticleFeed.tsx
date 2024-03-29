import { Link } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import { format } from "date-fns";
import "../styles/ArticleFeed.scss";

export default function ArticleFeed({
  articles,
}: {
  articles: ArticleProps[];
}) {
  return (
    <>
      <div className="article-feed">
        {articles.map((article) => (
          <Article key={article._id} article={article} />
        ))}
      </div>
    </>
  );
}

function Article({ article }: { article: ArticleProps }) {
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
      </div>
    </article>
  );
}
