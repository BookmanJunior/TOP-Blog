import { Navigate } from "react-router-dom";
import ArticlePreview from "../components/Article/ArticlePreview";
import { ArticleProps } from "../types/ArticleType";
import { UseUser } from "./Root";
import Spinner from "../components/Spinner";
import "../styles/User.scss";

export default function User() {
  const { user, loading } = UseUser();
  const isBookmarks = user?.bookmarks?.length;

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ redirectTo: "/me" }} />;
  }

  return (
    <main className="user-profile">
      <section className="user-bookmarks">
        <h2 className="section-title">Bookmarks</h2>
        {isBookmarks ? (
          <BookmarkedArticles bookmarks={user.bookmarks} />
        ) : (
          <p className="empty-section">
            You don't have any bookmarked articles
          </p>
        )}
      </section>
    </main>
  );
}

function BookmarkedArticles({ bookmarks }: { bookmarks: ArticleProps[] }) {
  return (
    <div className="bookmarked-articles article-row">
      {bookmarks.map((article) => (
        <ArticlePreview key={article._id} article={article} />
      ))}
    </div>
  );
}
