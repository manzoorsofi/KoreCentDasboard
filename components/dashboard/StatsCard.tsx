"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Grid,
} from "@mui/material";

export function StatsCard({
  title,
  value,
  icon,
  loading = false,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <Card
      elevation={0}
  sx={{
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 1,
    height: "100%",          // 🔑 fills grid cell
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 2,
    transition: "border-color 0.2s ease",
    "&:hover": {
      borderColor: "primary.main",
    },
  }}
    >
      <CardContent sx={{ p: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
              {icon ? (
            <Box
              sx={{
                bgcolor: "grey.100",
                color: "primary.main",
                p: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                minWidth: 56,
                minHeight: 56,
              }}
            >
              {icon}
            </Box>
          ) : null}
          <Box ml={3}>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={120} height={40} />
            ) : (
              <Typography variant="h3" fontWeight={600}>
                {value}
              </Typography>
            )}
          </Box>

      
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
