import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";

export default function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <Root />, children: [] },
  ]);

  return <RouterProvider router={router} />;
}
