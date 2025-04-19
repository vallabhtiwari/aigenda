"use client";
import { Theme, ThemeContextProps } from "@/lib/types";
import { useContext, useEffect, useState, createContext } from "react";

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
