"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Chip,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  Phone,
  VideoCall,
  MoreVert,
  SmartToy,
  Person,
  Circle,
} from "@mui/icons-material";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { type Message } from "@/types";

export function ChatInterface({
  initialMessages,
  onBack,
  chatName = "Chat",
  isBot = false,
  isOnline = false,
}: {
  initialMessages: Message[];
  onBack?: () => void;
  chatName?: string;
  isBot?: boolean;
  isOnline?: boolean;
}) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const theme = useTheme();

  const sendMessage = (content: string) => {
    const mine: Message = {
      id: crypto.randomUUID(),
      content,
      sender: { id: "me", name: "You" },
      timestamp: new Date(),
      type: "text",
    };
    setMessages(prev => [...prev, mine]);

    // Simulate typing indicator and response
    setTimeout(
      () => {
        const responses = [
          "That's interesting! Tell me more about that.",
          "I understand. How can I help you with this?",
          "Great point! Let me think about that.",
          "Thanks for sharing. What would you like to know?",
          "I see what you mean. Here's what I think...",
        ];

        const reply: Message = {
          id: crypto.randomUUID(),
          content: isBot
            ? responses[Math.floor(Math.random() * responses.length)]
            : `Thanks for your message: "${content}"`,
          sender: {
            id: isBot ? "bot" : "other",
            name: isBot ? "AI Assistant" : chatName,
          },
          timestamp: new Date(),
          type: "text",
        };
        setMessages(prev => [...prev, reply]);
      },
      1000 + Math.random() * 2000
    );
  };

  const getAvatarColor = () => {
    if (isBot) return theme.palette.primary.main;
    const colors = [
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ];
    return colors[chatName.charCodeAt(0) % colors.length];
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {onBack && (
          <IconButton
            size="small"
            onClick={onBack}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              bgcolor: alpha(theme.palette.action.hover, 0.5),
              "&:hover": {
                bgcolor: alpha(theme.palette.action.hover, 0.8),
              },
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
        )}

        <Badge
          color="success"
          invisible={!isOnline}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            "& .MuiBadge-dot": {
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: `2px solid ${theme.palette.background.paper}`,
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: getAvatarColor(),
              width: 44,
              height: 44,
              boxShadow: `0 2px 8px ${alpha(getAvatarColor(), 0.3)}`,
            }}
          >
            {isBot ? <SmartToy /> : <Person />}
          </Avatar>
        </Badge>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{
                fontSize: "1.1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {chatName}
            </Typography>
            {isBot && (
              <Chip
                label="AI Assistant"
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isOnline && (
              <>
                <Circle
                  sx={{ fontSize: 8, color: theme.palette.success.main }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {isBot ? "Always available" : "Active now"}
                </Typography>
              </>
            )}
            {!isOnline && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.8rem" }}
              >
                Last seen recently
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {!isBot && (
            <>
              <IconButton
                sx={{
                  bgcolor: alpha(theme.palette.action.hover, 0.5),
                  "&:hover": {
                    bgcolor: alpha(theme.palette.action.hover, 0.8),
                    color: theme.palette.primary.main,
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Phone fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: alpha(theme.palette.action.hover, 0.5),
                  "&:hover": {
                    bgcolor: alpha(theme.palette.action.hover, 0.8),
                    color: theme.palette.primary.main,
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <VideoCall fontSize="small" />
              </IconButton>
            </>
          )}
          <IconButton
            sx={{
              bgcolor: alpha(theme.palette.action.hover, 0.5),
              "&:hover": {
                bgcolor: alpha(theme.palette.action.hover, 0.8),
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: alpha(theme.palette.background.default, 0.3),
          backgroundImage: `radial-gradient(circle at 25% 25%, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, ${alpha(theme.palette.secondary.main, 0.02)} 0%, transparent 50%)`,
          position: "relative",
        }}
      >
        <MessageList messages={messages} />
      </Box>

      {/* Input Area */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: "background.paper",
          backdropFilter: "blur(10px)",
        }}
      >
        <MessageInput onSend={sendMessage} />
      </Paper>
    </Box>
  );
}

export default ChatInterface;
