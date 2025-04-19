"use client";
import { useTheme } from "@/providers/ThemeProvider";
import React from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "dark" ? "light" : "dark"}
    </button>
  );
};

export default ThemeToggle;
