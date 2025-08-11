import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./layouts/app-layout";
import Posts, { postsLoader } from "./pages/Posts";
import PostComments, { postCommentLoader } from "./pages/PostComments";
import Error from "./components/Error";
import RequireAuth from "./components/require-auth";
import Products from "./pages/Products";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      hydrateFallbackElement: <div>Loading....</div>,
      children: [
        {
          path: "posts",
          element: (
            <RequireAuth>
              <Posts />
            </RequireAuth>
          ),
          loader: postsLoader,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "posts/:postID",
          element: (
            <RequireAuth>
              <PostComments />
            </RequireAuth>
          ),
          loader: postCommentLoader,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
