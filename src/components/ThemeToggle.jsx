"use client";
import { useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "./ThemeContext";

export function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rule bg-surface text-app-primary transition-colors hover:bg-rule"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
    );
}
