"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", next);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(next);
        setTheme(next);
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
