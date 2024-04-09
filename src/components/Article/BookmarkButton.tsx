import { useState } from "react";
import BookmarkLogo from "../../assets/bookmark-full.svg?react";
import { UseUser } from "../../routes/Root";

export default function Bookmark({ articleId }: { articleId: string }) {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = UseUser();
  const isBookmarked = user?.bookmarks.some(
    (article) => article._id === articleId
  );

  return (
    user && (
      <form className="bookmark-form" onSubmit={handleBookmark}>
        <button disabled={loading} className="bookmark-button">
          <BookmarkLogo
            className={`bookmark-logo ${isBookmarked ? "bookmarked" : ""}`}
          />
        </button>
      </form>
    )
  );

  async function handleBookmark(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const fetchMethod = isBookmarked ? "DELETE" : "PUT";

    try {
      const res = await fetch(`http://localhost:3000/me/${articleId}`, {
        method: fetchMethod,
        mode: "cors",
        credentials: "include",
      });

      const resResult = await res.json();

      if (res.ok && user) {
        setUser({ ...user, bookmarks: resResult });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
}
