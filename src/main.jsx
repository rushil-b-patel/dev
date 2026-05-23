import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "react-activity-calendar/tooltips.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeContext";

const root = document.getElementById("root");
const app = (
  <HelmetProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </HelmetProvider>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
