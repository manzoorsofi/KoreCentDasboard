"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { PageHeader, PageContainer } from "@/components/ui";
import { ThemeToggle } from "@/components/ui";
import { useThemeContext } from "@/components/providers";

export default function SettingsPage() {
  const { mode, setMode } = useThemeContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <PageContainer>
      <PageHeader title="Settings" subtitle="Personalize your experience" />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mt: 2,
        }}
      >
        {/* Profile Card */}
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="600">
            Profile
          </Typography>
          <Box
            component="form"
            onSubmit={e => e.preventDefault()}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ alignSelf: "flex-start", borderRadius: 2 }}
            >
              Save
            </Button>
          </Box>
        </Paper>
        {/* Appearance Card */}
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="600">
            Appearance
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <FormControl fullWidth>
              <InputLabel id="theme-mode-label">Theme Mode</InputLabel>
              <Select
                labelId="theme-mode-label"
                value={mode}
                onChange={e => setMode(e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>
            <ThemeToggle />
          </Box>
        </Paper>
      </Box>
    </PageContainer>
  );
}
