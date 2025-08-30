"use client";

import React from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  action,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 240 }}>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs
            sx={{ color: "text.secondary", mb: 0.5 }}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((bc, idx) => (
              <Typography
                key={`${bc.label}-${idx}`}
                color="text.secondary"
                variant="body2"
              >
                {bc.label}
              </Typography>
            ))}
          </Breadcrumbs>
        ) : null}
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {action ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {action}
        </Box>
      ) : null}
    </Box>
  );
}

export default PageHeader;
