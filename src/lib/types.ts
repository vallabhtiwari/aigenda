import { z } from "zod";
import { AuthSchema } from "./zodSchemas";

export type Todo = {
  id: string;
  title: string;
  prompt?: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
  userEmail: string;
};

export type Theme = "dark" | "light";
export type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export type NavLinkProps = {
  href: string;
  className?: string;
  isActive?: boolean;
};

export type AuthCreds = z.infer<typeof AuthSchema>;
