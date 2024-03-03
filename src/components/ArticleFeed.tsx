import ArticlesFetch from "./ArticlesFetch";
import { Link } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import { format } from "date-fns";
export default function ArticleFeed() {
  const { data, error, loading } = ArticlesFetch();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="article-feed">
      {data.map((article) => (
        <Article key={article._id} article={article} />
      ))}
    </div>
  );
}

type Article = {
  article: ArticleProps;
};

function Article({ article }: Article) {
  return (
    <article className="article">
      <img
        src={article.cover}
        alt={`${article.title} cover`}
        className="article__cover"
      />
      <Link to={`/articles/${article._id}`}>
        <h2 className="article__title">{article.title}</h2>
      </Link>
      <div className="article__info">
        <span className="article__author">{article.author.username} - </span>
        <span className="article__date">{format(article.date, "PPP")}</span>
      </div>
    </article>
  );
}
