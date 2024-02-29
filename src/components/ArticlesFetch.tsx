import { useEffect, useState } from "react";
import { ArticleProps } from "../types/ArticleType";

export default function ArticlesFetch() {
  const [data, setData] = useState<ArticleProps[]>([] as ArticleProps[]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);
  const apiEndPoint = "http://localhost:3000/articles";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(apiEndPoint, {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status >= 400) {
          const resError = await res.json();
          throw new Error(resError);
        }

        const resData = await res.json();
        setData(resData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, error, loading };
}
