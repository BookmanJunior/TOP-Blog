import { useRef, useState } from "react";
import ValidationError from "../InputValidationError";
import { ArticleProps } from "../../types/ArticleType";

type CommentFormError = {
  comment?: string;
  networkError?: string;
};

type CommentFormProps = {
  article: ArticleProps;
  setArticle: (article: ArticleProps) => void;
};

export default function CommentForm({ article, setArticle }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<CommentFormError>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="comment-form">
      <textarea
        name="comment"
        rows={2}
        placeholder="Add Comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleEnter}
        disabled={isSubmitting}
      ></textarea>
      <ValidationError error={errors?.comment ?? errors?.networkError} />
    </form>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!comment.trim().length) {
      setErrors({ ...errors, comment: "Comment can't be empty" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/comments", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, articleId: article._id }),
      });

      if (res.status >= 400) {
        const resError = (await res.json()) as CommentFormError;
        setErrors(resError);
        return;
      }

      const resData = await res.json();
      setArticle({ ...article, comments: [resData, ...article.comments] });
      setComment("");
      setErrors({});
    } catch (error) {
      setErrors({
        networkError: "Network Error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }
}
