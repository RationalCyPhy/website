"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "aerospace" | "consumer";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "aerospace",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("aerospace");

  useEffect(() => {
    const saved = localStorage.getItem("rcp-theme") as Theme | null;
    if (saved === "consumer" || saved === "aerospace") {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("rcp-theme", t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "aerospace" ? "consumer" : "aerospace");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
