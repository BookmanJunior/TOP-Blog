import { useLoaderData } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";

export default function ArticlePage() {
  const article = useLoaderData() as ArticleProps;
  return (
    <div className="article-page">
      <img src={article.cover} />
      <h2>{article.title}</h2>
      <div>{article.content}</div>
    </div>
  );
}
