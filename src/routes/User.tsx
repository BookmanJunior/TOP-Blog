import ArticleFeed from "../components/ArticleFeed";
import { UseUser } from "./Root";

export default function User() {
  const { user } = UseUser();
  const isBookmarks = user?.bookmarks?.length;

  return (
    <>
      <div className="user-bookmarks">
        <h2>Bookmarks</h2>
        {isBookmarks ? (
          <ArticleFeed articles={user.bookmarks} />
        ) : (
          <div>You don't have any bookmarked articles</div>
        )}
      </div>
    </>
  );
}
