import "@mdxeditor/editor/style.css";
import { UseUser } from "./Root";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useState } from "react";
import ArticleEditor from "../components/ArticleEditor";

export default function NewArticle() {
  const [articleCover, setArticleCover] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [submitting, setSubmitting] = useState(true);
  const { user, loading } = UseUser();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ redirectTo: location.pathname }} />
    );
  }

  return (
    <>
      <form className="article-form" onSubmit={handleSubmit}>
        <section className="article-form-wrapper">
          <FormInput
            name="cover"
            title="Cover"
            type="url"
            onChange={(e) => setArticleCover(e.target.value)}
          ></FormInput>
          <FormInput
            name="title"
            title="Title"
            onChange={(e) => setArticleTitle(e.target.value)}
          ></FormInput>
          <ArticleEditor setArticleContent={setArticleContent} />
        </section>
        <button className="submit-button" disabled={submitting}>
          Submit
        </button>
      </form>
    </>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/articles", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cover: articleCover,
          title: articleTitle,
          content: articleContent,
        }),
      });

      const resResult = await res.json();

      if (res.status >= 400) {
        console.log(resResult);
        return;
      }

      navigate(`/articles/${resResult._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
}
