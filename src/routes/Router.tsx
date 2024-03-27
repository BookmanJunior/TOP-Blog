import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./Home";
import ArticlePage from "../components/ArticlePage";
import Login from "./Login";
import SignUp from "./SignUp";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
