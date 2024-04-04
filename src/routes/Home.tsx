import ArticlePreview from "../components/ArticlePreview";
import FeaturedArticle from "../components/FeaturedArticle";
import ArticlesFetch from "../components/ArticlesFetch";

export default function Home() {
  const { data, error, loading } = ArticlesFetch();
  const featuredArticle = data.filter((article) => article.featured)[0];

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return (
      <div className="error">
        Something went wrong. Please refresh the page.
      </div>
    );
  }

  return (
    <>
      <FeaturedArticle article={featuredArticle} />
      <section className="article-feed">
        {data.length ? (
          data.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))
        ) : (
          <div>No Articles</div>
        )}
      </section>
    </>
  );
}
