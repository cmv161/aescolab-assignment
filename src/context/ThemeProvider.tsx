import { type ReactNode, useEffect, useMemo, useState } from "react";

import { type Theme, ThemeContext } from "@/context/ThemeContext";

type ThemeProviderProps = {
  children: ReactNode;
};

const getInitialTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
