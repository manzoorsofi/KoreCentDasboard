"use client";

import React from "react";
import { Container } from "@mui/material";

export function PageContainer({
  children,
  maxWidth = "lg",
}: {
  children: React.ReactNode;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
}) {
  return (
    <Container maxWidth={maxWidth} sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
      {children}
    </Container>
  );
}

export default PageContainer;
