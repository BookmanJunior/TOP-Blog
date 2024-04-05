import ArticlePreview from "../components/Article/ArticlePreview";
import { ArticleProps } from "../types/ArticleType";
import { UseUser } from "./Root";

export default function User() {
  const { user } = UseUser();
  const isBookmarks = user?.bookmarks?.length;

  return (
    <>
      <div className="user-bookmarks">
        <h2>Bookmarks</h2>
        {isBookmarks ? (
          <BookmarkedArticles bookmarks={user.bookmarks} />
        ) : (
          <div>You don't have any bookmarked articles</div>
        )}
      </div>
    </>
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
