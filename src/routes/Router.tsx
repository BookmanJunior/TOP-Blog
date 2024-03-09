import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./Home";
import ArticlePage from "../components/ArticlePage";
import ArticleLoader from "../components/ArticleLoader";
import Login from "./Login";
import SignUp from "./SignUp";
import NewArticle from "./NewArticle";

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
        { path: "login", element: <Login /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "new-article", element: <NewArticle /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
