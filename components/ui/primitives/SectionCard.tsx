"use client";

import React from "react";
import { Card, CardContent, CardHeader, type CardProps } from "@mui/material";

export function SectionCard({
  title,
  subheader,
  action,
  children,
  ...rest
}: {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
} & CardProps) {
  return (
    <Card {...rest}>
      {title || subheader || action ? (
        <CardHeader
          title={title}
          subheader={subheader}
          action={action}
          sx={{ pb: 0 }}
        />
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default SectionCard;
