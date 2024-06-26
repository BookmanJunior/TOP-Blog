import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./Home";
import ArticlePage from "./ArticlePage";
import Login from "./Login";
import SignUp from "./SignUp";
import User from "./User";
import ErrorElement from "../components/ErrorElements";
import CategoryPage from "./CategoryPage";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorElement />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "articles/:id",
          element: <ArticlePage />,
        },
        { path: "login", element: <Login /> },
        { path: "sign-up", element: <SignUp /> },
        {
          path: "me",
          element: <User />,
        },
        {
          path: "category/:categoryName",
          element: <CategoryPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
