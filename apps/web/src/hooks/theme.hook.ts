import { useEffect } from "react";

import { useThemeStore } from "@/stores";
import { ITheme } from "@/types";

export const useTheme = () => {
  const {
    theme,
    themeClass,
    setTheme,
    setThemeClass,
  } = useThemeStore();

  const htmlDocument =
    window.document.documentElement;
  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  useEffect(() => {
    const updateTheme = (theme: ITheme) => {
      htmlDocument.classList.remove(
        "light",
        "dark",
      );
      if (theme === "system") {
        const systemTheme = mediaQuery.matches
          ? "dark"
          : "light";
        htmlDocument.classList.add(systemTheme);
        setThemeClass(systemTheme);
      } else {
        htmlDocument.classList.add(theme);
        setThemeClass(theme);
      }
    };

    // Initial theme setup
    updateTheme(theme);

    // Listen for system theme changes
    const listener = () => {
      updateTheme(theme);
    };
    mediaQuery.addEventListener(
      "change",
      listener,
    );

    // Cleanup
    return () =>
      mediaQuery.removeEventListener(
        "change",
        listener,
      );
  }, [
    htmlDocument.classList,
    mediaQuery,
    setThemeClass,
    theme,
  ]);

  return {
    theme,
    themeClass: themeClass,
    setTheme: (theme: ITheme) => {
      setTheme(theme);
    },
  };
};
