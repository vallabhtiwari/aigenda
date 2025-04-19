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
