"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type ThemeMode = "light" | "dark" | "system";

interface UseThemeReturn {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

/**
 * Custom hook for theme management with localStorage persistence
 * Supports light, dark, and system preference modes
 */
export function useTheme(): UseThemeReturn {
  const [mode, setMode] = useLocalStorage<ThemeMode>("theme-mode", "system");
  const [systemPreference, setSystemPreference] = useState<"light" | "dark">(
    "light"
  );

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemPreference = () => {
      setSystemPreference(mediaQuery.matches ? "dark" : "light");
    };

    // Set initial value
    updateSystemPreference();

    // Listen for changes
    mediaQuery.addEventListener("change", updateSystemPreference);
    return () =>
      mediaQuery.removeEventListener("change", updateSystemPreference);
  }, []);

  // Resolve the actual theme based on mode and system preference
  const resolvedMode: "light" | "dark" = (() => {
    if (mode === "system") {
      return systemPreference;
    }
    return mode;
  })();

  const toggleMode = useCallback(() => {
    setMode(prevMode => {
      if (prevMode === "light") return "dark";
      if (prevMode === "dark") return "system";
      return "light"; // system -> light
    });
  }, [setMode]);

  return {
    mode,
    resolvedMode,
    setMode,
    toggleMode,
  };
}
