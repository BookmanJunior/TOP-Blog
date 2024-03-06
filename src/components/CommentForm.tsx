import { useRef, useState } from "react";
import ValidationError from "./InputValidationError";

type CommentFormError = {
  comment?: string;
  networkError?: string;
};

export default function CommentForm({ articleId }: { articleId: string }) {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<CommentFormError>();
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

    try {
      const res = await fetch("http://localhost:3000/comments", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, articleId }),
      });

      if (res.status >= 400) {
        const resError = (await res.json()) as CommentFormError;
        setErrors(resError);
        return;
      }

      const resData = await res.json();
      console.log(resData);
      setErrors({});
      setComment("");
    } catch (error) {
      setErrors({
        networkError: "Network Error. Please try again.",
      });
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }
}
