"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/components/providers";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const items = useMemo(
    () => [
      { label: "Dashboard", href: ROUTES.DASHBOARD, icon: <DashboardIcon /> },
      { label: "Reports", href: ROUTES.REPORTS, icon: <AssessmentIcon /> },
      { label: "Chat", href: ROUTES.CHAT, icon: <ChatIcon /> },
      { label: "Settings", href: ROUTES.SETTINGS, icon: <SettingsIcon /> },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar />
      <Divider />
      <List sx={{ flex: 1 }}>
        {items.map(item => {
          const selected = pathname?.startsWith(item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={onNavigate}
              selected={!!selected}
              aria-current={selected ? "page" : undefined}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          aria-label="Log out"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
