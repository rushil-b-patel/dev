import { Route, Routes } from "react-router-dom";
import { ThemeToggle } from "./components/ThemeToggle";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
