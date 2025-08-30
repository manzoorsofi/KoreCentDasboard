"use client";

import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { LightMode, DarkMode, SettingsBrightness } from "@mui/icons-material";
import { useThemeContext } from "@/components/providers";

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until after hydration to prevent mismatch
  if (!mounted) {
    return (
      <IconButton
        color="inherit"
        aria-label="toggle theme"
        sx={{
          transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <SettingsBrightness />
      </IconButton>
    );
  }

  const getIcon = () => {
    switch (mode) {
      case "light":
        return <LightMode />;
      case "dark":
        return <DarkMode />;
      case "system":
        return <SettingsBrightness />;
      default:
        return <SettingsBrightness />;
    }
  };

  const getTooltip = () => {
    switch (mode) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      case "system":
        return "Switch to light mode";
      default:
        return "Toggle theme";
    }
  };

  return (
    <Tooltip title={getTooltip()}>
      <IconButton
        onClick={toggleMode}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
}
