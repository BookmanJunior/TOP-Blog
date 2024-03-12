import { useEffect, useState } from "react";
import { ArticleProps } from "../types/ArticleType";
import { useParams } from "react-router-dom";

export default function ArticleLoader() {
  const [article, setArticle] = useState<ArticleProps>({} as ArticleProps);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const apiEndPoint = `http://localhost:3000/articles/${id}`;
    async function fetchData() {
      try {
        const res = await fetch(apiEndPoint, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status >= 400) {
          const { message } = await res.json();
          throw new Error(message);
        }

        const resData: ArticleProps = await res.json();
        setArticle(resData);
      } catch (error) {
        throw new Error((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { article, setArticle, loading };
}
