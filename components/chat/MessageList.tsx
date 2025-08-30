"use client";

import React, { useEffect, useRef } from "react";
import { Box, Avatar, Typography, Stack, Paper } from "@mui/material";
import { type Message } from "@/types";

export function MessageList({ messages }: { messages: Message[] }) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ p: 2, overflowY: "auto", height: "100%" }} aria-live="polite">
      <Stack spacing={2}>
        {messages.map(msg => {
          const isOwn = msg.sender.id === "me";
          return (
            <Stack
              key={msg.id}
              direction="row"
              spacing={1}
              justifyContent={isOwn ? "flex-end" : "flex-start"}
            >
              {!isOwn && (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {msg.sender.name?.charAt(0)?.toUpperCase() ?? "U"}
                </Avatar>
              )}
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  bgcolor: isOwn ? "primary.main" : "background.paper",
                  color: isOwn ? "primary.contrastText" : "text.primary",
                }}
                aria-label={
                  isOwn ? "Your message" : `${msg.sender.name}'s message`
                }
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  color={isOwn ? "primary.contrastText" : "text.secondary"}
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Paper>
              {isOwn && (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {msg.sender.name?.charAt(0)?.toUpperCase() ?? "Y"}
                </Avatar>
              )}
            </Stack>
          );
        })}
        <div ref={endRef} />
      </Stack>
    </Box>
  );
}

export default MessageList;
