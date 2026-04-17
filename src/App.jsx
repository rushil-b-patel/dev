import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
