import { useEffect, useMemo, useState } from "react";

type AppTheme = "light" | "dark" | "system";
const STORAGE_KEY = "taskflow-theme";

export function useThemeSwitch() {
  const [theme, setThemeState] = useState<AppTheme>("system");
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem(STORAGE_KEY) as AppTheme | null;
      if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
        setThemeState(savedTheme);
      }

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      setSystemTheme(media.matches ? "dark" : "light");

      const handleChange = (event: MediaQueryListEvent) => {
        setSystemTheme(event.matches ? "dark" : "light");
      };

      media.addEventListener("change", handleChange);
      setMounted(true);

      return () => media.removeEventListener("change", handleChange);
    }

    setMounted(true);
  }, []);

  const activeTheme = theme === "system" ? systemTheme : theme;

  const isDark = mounted ? activeTheme === "dark" : true;

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.classList.toggle("dark", activeTheme === "dark");

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [activeTheme, theme]);

  const setTheme = (value: AppTheme) => {
    setThemeState(value);
  };

  const toggleTheme = () => {
    setThemeState(activeTheme === "dark" ? "light" : "dark");
  };

  return useMemo(
    () => ({
      mounted,
      theme,
      activeTheme,
      isDark,
      setTheme,
      setLight: () => setTheme("light"),
      setDark: () => setTheme("dark"),
      setSystem: () => setTheme("system"),
      toggleTheme,
    }),
    [mounted, theme, activeTheme, isDark]
  );
}
