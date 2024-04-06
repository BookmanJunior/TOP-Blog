import { useEffect, useState } from "react";

type ErrorType = Response | Error | undefined;

type FetchResult<T> = {
  data: T | undefined;
  setData: (arg0: T) => void;
  loading: boolean;
  error: ErrorType;
};

export default function DataFetch<T>(apiEndpoint: string): FetchResult<T> {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(apiEndpoint, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        });

        const resResult = await res.json();

        if (res.status >= 400) {
          const customError = new Response("", {
            status: res.status,
            statusText: resResult.message,
          });
          setError(customError);
          return;
        }

        setData(resResult);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiEndpoint]);

  return { data, setData, loading, error };
}
