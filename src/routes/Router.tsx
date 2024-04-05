import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./Home";
import ArticlePage from "./ArticlePage";
import Login from "./Login";
import SignUp from "./SignUp";
import User from "./User";

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
        },
        { path: "login", element: <Login /> },
        { path: "sign-up", element: <SignUp /> },
        {
          path: "me",
          element: <User />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
