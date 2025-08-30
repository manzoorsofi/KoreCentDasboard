import { createTheme } from "@mui/material/styles";

// Design tokens for consistent theming
const designTokens = {
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  animation: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
};

// Create a theme instance with MUI and Tailwind compatibility
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // Indigo 600
      light: "#6366f1", // Indigo 500
      dark: "#4338ca", // Indigo 700
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0ea5e9", // Sky 500
      light: "#38bdf8", // Sky 400
      dark: "#0284c7", // Sky 600
      contrastText: "#0b1220",
    },
    error: {
      main: "#d32f2f", // Red 700
      light: "#ef5350", // Red 400
      dark: "#c62828", // Red 800
    },
    warning: {
      main: "#ed6c02", // Orange 700
      light: "#ff9800", // Orange 500
      dark: "#e65100", // Orange 900
    },
    info: {
      main: "#0288d1", // Light Blue 700
      light: "#03a9f4", // Light Blue 500
      dark: "#01579b", // Light Blue 900
    },
    success: {
      main: "#2e7d32", // Green 700
      light: "#4caf50", // Green 500
      dark: "#1b5e20", // Green 900
    },
    background: {
      default: "#f7f7f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#475569", // Slate 600
      disabled: "#94a3b8", // Slate 400
    },
    divider: "#e6e8eb",
    action: {
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.25rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.375rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.235,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.334,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: designTokens.borderRadius.sm,
  },
  spacing: designTokens.spacing.sm, // 8px base spacing
  components: {
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.sm,
          textTransform: "none",
          fontWeight: 500,
          transition: `all ${designTokens.animation.duration.shortest}ms ${designTokens.animation.easing.easeInOut}`,
          minHeight: 36,
          letterSpacing: 0.2,
        },
        contained: {
          boxShadow: "0 1px 2px rgba(10, 12, 15, 0.08)",
          "&:hover": {
            boxShadow: "0 2px 6px rgba(10, 12, 15, 0.10)",
          },
        },
        outlined: {
          borderWidth: 1,
          "&:hover": {
            borderWidth: 1,
          },
        },
      },
    },
    // Card customization
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          boxShadow: "0 1px 2px rgba(10, 12, 15, 0.06)",
          border: "1px solid",
          borderColor: "divider",
          transition: `all ${designTokens.animation.duration.shortest}ms ${designTokens.animation.easing.easeInOut}`,
          "&:hover": {
            boxShadow: "0 4px 12px rgba(10, 12, 15, 0.08)",
          },
        },
      },
    },
    // Paper customization
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.sm,
          border: "1px solid",
          borderColor: "divider",
        },
        elevation1: {
          boxShadow: "0 1px 2px rgba(10, 12, 15, 0.08)",
        },
      },
    },
    // TextField customization
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: designTokens.borderRadius.sm,
            transition: `border-color ${designTokens.animation.duration.shorter}ms ${designTokens.animation.easing.easeInOut}`,
            backgroundColor: "background.paper",
          },
        },
      },
    },
    // Drawer customization
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    // AppBar customization
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 0 rgba(10, 12, 15, 0.06)",
        },
      },
    },
    // Chip customization
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
        },
      },
    },
    // Table Head - subtle background
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f4f6",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Dark theme variant
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    primary: {
      main: "#8b9cf5", // Indigo-ish 300
      light: "#a5b4fc", // Indigo 200
      dark: "#6366f1", // Indigo 500
      contrastText: "#0b1220",
    },
    secondary: {
      main: "#67e8f9", // Sky 200
      light: "#a5f3fc",
      dark: "#22d3ee",
      contrastText: "#0b1220",
    },
    error: {
      main: "#f44336", // Red 500
      light: "#e57373", // Red 300
      dark: "#d32f2f", // Red 700
    },
    warning: {
      main: "#ff9800", // Orange 500
      light: "#ffb74d", // Orange 300
      dark: "#f57c00", // Orange 700
    },
    info: {
      main: "#2196f3", // Blue 500
      light: "#64b5f6", // Blue 300
      dark: "#1976d2", // Blue 700
    },
    success: {
      main: "#4caf50", // Green 500
      light: "#81c784", // Green 300
      dark: "#388e3c", // Green 700
    },
    background: {
      default: "#0b0d10",
      paper: "#111318",
    },
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
      disabled: "#6b7280",
    },
    divider: "#1f242b",
    action: {
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
  components: {
    ...theme.components,
    // Table Head - dark mode background
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1d23", // Dark header background
        },
      },
    },
  },
});

// Export design tokens for use in components
export { designTokens };

export default theme;
