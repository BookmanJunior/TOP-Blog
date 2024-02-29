export default async function ArticleLoader(articleId: string | undefined) {
  const apiEndPoint = `http://localhost:3000/articles/${articleId}`;
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

    const resData = await res.json();
    return resData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
