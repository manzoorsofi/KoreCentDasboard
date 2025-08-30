"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";

export function EmptyState({
  title = "No data",
  description,
  action,
  icon,
}: {
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        px: 2,
        color: "text.secondary",
      }}
    >
      <Box sx={{ fontSize: 48, mb: 1, color: "primary.main" }}>
        {icon ?? null}
      </Box>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      ) : null}
      {action ? (
        <Button variant="contained" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </Box>
  );
}

export default EmptyState;
