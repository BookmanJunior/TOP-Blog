import { useParams } from "react-router-dom";
import DataFetch from "../components/DataFetch";
import { ArticleProps } from "../types/ArticleType";
import Spinner from "../components/Spinner";
import ArticlePreview from "../components/Article/ArticlePreview";

export default function CategoryPage() {
  const { categoryName } = useParams();

  const { data, loading, error } = DataFetch<ArticleProps[]>(
    `http://localhost:3000/category/${categoryName}`
  );

  if (loading) return <Spinner />;

  if (error) throw error;

  return (
    <main className="category-page">
      <h2 className="section-title">{categoryName}</h2>
      {data ? (
        <section className="article-row">
          {data?.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))}
        </section>
      ) : (
        <p className="empty-section">This category is empty</p>
      )}
    </main>
  );
}
