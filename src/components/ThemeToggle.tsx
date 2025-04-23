"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import React from "react";

export const ThemeToggle = ({
  variant,
  className,
}: {
  variant?: "icon" | "button";
  className?: string;
}) => {
  const { theme, toggleTheme } = useTheme();
  if (variant === "icon") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-full",
          "text-white bg-gray-800/90 dark:text-black dark:bg-white",
          "hover:cursor-pointer transition-colors duration-300",
          className
        )}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    );
  }
  return (
    <button
      onClick={toggleTheme}
      className={cn("hover:cursor-pointer", className)}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};
