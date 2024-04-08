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
    <div className="user-profile">
      <div className="user-bookmarks">
        <h2>Bookmarks</h2>
        {isBookmarks ? (
          <BookmarkedArticles bookmarks={user.bookmarks} />
        ) : (
          <div>You don't have any bookmarked articles</div>
        )}
      </div>
    </div>
  );
}

function BookmarkedArticles({ bookmarks }: { bookmarks: ArticleProps[] }) {
  return (
    <section className="bookmarked-articles">
      {bookmarks.map((article) => (
        <ArticlePreview key={article._id} article={article} />
      ))}
    </section>
  );
}
