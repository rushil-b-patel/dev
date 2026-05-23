import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import BlogIndex from "./pages/BlogIndex.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import { ThemeProvider } from "./components/ThemeContext.jsx";

function ServerApp() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 sm:px-6 py-12 md:py-16 overflow-x-hidden">
        <div className="mx-auto w-full max-w-2xl">
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

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <StaticRouter location={url}>
          <ServerApp />
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
  return { html, helmet: helmetContext.helmet };
}
