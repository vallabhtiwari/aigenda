"use client";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import React from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="hidden xs:block p-2 rounded-full text-white bg-gray-800/90 dark:text-black dark:bg-white hover:cursor-pointer transition-colors duration-300"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};
