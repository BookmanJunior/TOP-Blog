import { useParams } from "react-router-dom";
import { ArticleProps } from "../types/ArticleType";
import { UseUser } from "./Root";
import DataFetch from "../components/DataFetch";
import ArticleHeader from "../components/Article/ArticleHeader";
import ArticleBody from "../components/Article/ArticleBody";
import ArticleComments from "../components/Article/ArticleComments";
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
        <ArticleComments article={data} setArticle={setData} user={user} />
      </main>
    )
  );
}
