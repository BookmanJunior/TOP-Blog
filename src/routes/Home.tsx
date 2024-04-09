import ArticlePreview from "../components/Article/ArticlePreview";
import FeaturedArticle from "../components/Article/FeaturedArticle";
import DataFetch from "../components/DataFetch";
import Spinner from "../components/Spinner";
import { ArticleProps } from "../types/ArticleType";

export default function Home() {
  const { data, error, loading } = DataFetch<ArticleProps[]>(
    "http://localhost:3000/articles"
  );
  const featuredArticle = data?.filter((article) => article.featured)[0];

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <main>
      <FeaturedArticle article={featuredArticle} />
      <section className="article-feed article-row">
        {data ? (
          data.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))
        ) : (
          <div>No Articles</div>
        )}
      </section>
    </main>
  );
}
