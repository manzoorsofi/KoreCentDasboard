"use client";

import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { ThemeToggle } from "@/components/ui";
import { useAuth } from "@/components/providers";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { userEmail } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          {userEmail ? `Welcome, ${userEmail}!` : "Dashboard"}
        </Typography>
        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
