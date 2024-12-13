import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// PAGINE
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import NewPostPage from "./pages/NewPostPage";
//index
import SinglePost from "./pages/SinglePost";
//show
import PostsPage from "./pages/PostsPage/PostsPage";
// LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";
import AlternativeLayout from "./layouts/AlternativeLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<AlternativeLayout />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/new" element={<NewPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
