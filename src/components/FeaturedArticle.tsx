import { Link } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import "../styles/FeaturedArticle.scss";

export default function FeaturedArticle({
  article,
}: {
  article: ArticleProps;
}) {
  return (
    <Link to={`articles/${article._id}`}>
      <div className="featured-article">
        <div>
          <span className="featured-tag">Featured Article</span>
          <h1>{article.title}</h1>L
        </div>
        <img
          src={article.cover}
          alt={"Featured article cover"}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
