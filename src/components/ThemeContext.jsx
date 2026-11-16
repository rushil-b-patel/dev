"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("theme") || window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        setTheme(stored);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(stored);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("theme", theme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme, mounted]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
