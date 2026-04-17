import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { RESUME_PDF_URL } from "../config/site";

const navLinkClass = ({ isActive }) =>
  [
    "text-sm font-medium transition-colors duration-200",
    isActive
      ? "text-app-primary"
      : "text-app-muted hover:text-app-primary",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between">
        <nav className="flex items-center gap-6" aria-label="Primary">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-app-muted transition-colors duration-200 hover:text-app-primary"
          >
            Resume
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
