import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "react-activity-calendar/tooltips.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeContext";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </HelmetProvider>
);
