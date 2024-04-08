import { Link } from "react-router-dom";
import { ArticleProps } from "../../types/ArticleType";
import "../../styles/FeaturedArticle.scss";

type FeaturedArticleProps = {
  article: ArticleProps | undefined;
};

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link to={`articles/${article?._id}`} className="featured-article">
      <div>
        <span className="featured-tag">Featured Article</span>
        <h1>{article?.title}</h1>
      </div>
      <img src={article?.cover} alt={"Featured article cover"} loading="lazy" />
    </Link>
  );
}
