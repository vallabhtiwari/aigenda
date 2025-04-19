export type Todo = {
  id: string;
  title: string;
  complete: boolean;
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
