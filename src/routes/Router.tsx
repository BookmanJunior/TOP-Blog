import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./Home";
import ArticlePage from "../components/ArticlePage";
import ArticleLoader from "../components/ArticleLoader";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "articles/:id",
          element: <ArticlePage />,
          loader: ({ params }) => {
            return ArticleLoader(params.id);
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
