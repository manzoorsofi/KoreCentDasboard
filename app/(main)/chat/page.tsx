"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Badge,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Message as MessageIcon,
  Person,
  SmartToy,
  Search,
  Add,
  MoreVert,
} from "@mui/icons-material";
import { PageContainer, PageHeader } from "@/components/ui";
import ChatInterface from "@/components/chat/ChatInterface";
import { type Message } from "@/types";

type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  messages: Message[];
  avatar?: string;
  isOnline?: boolean;
  unreadCount?: number;
  lastActive?: string;
  isBot?: boolean;
};

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "AI Assistant",
    lastMessage: "I'm here to help",
    isBot: true,
    isOnline: true,
    unreadCount: 2,
    lastActive: "now",
    messages: [
      {
        id: "m1",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        sender: { id: "bot", name: "AI Assistant" },
        timestamp: new Date(),
        type: "text",
      },
    ],
  },
  {
    id: "2",
    name: "Alice Johnson",
    lastMessage: "Thanks for the help! See you tomorrow 👋",
    isOnline: true,
    lastActive: "5 min ago",
    messages: [
      {
        id: "m2",
        content: "Hey, are we still meeting for the project discussion?",
        sender: { id: "alice", name: "Alice Johnson" },
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "m3",
        content: "Thanks for the help! See you tomorrow 👋",
        sender: { id: "alice", name: "Alice Johnson" },
        timestamp: new Date(),
        type: "text",
      },
    ],
  },
  {
    id: "3",
    name: "Marketing Team",
    lastMessage: "The campaign results look amazing!",
    lastActive: "2 hours ago",
    unreadCount: 5,
    messages: [
      {
        id: "m4",
        content: "The campaign results look amazing!",
        sender: { id: "team", name: "Marketing Team" },
        timestamp: new Date(),
        type: "text",
      },
    ],
  },
  {
    id: "4",
    name: "David Chen",
    lastMessage: "Let's discuss the new features",
    lastActive: "1 day ago",
    messages: [
      {
        id: "m5",
        content: "Let's discuss the new features",
        sender: { id: "david", name: "David Chen" },
        timestamp: new Date(),
        type: "text",
      },
    ],
  },
];

export default function ChatsPage() {
  const [activeChat, setActiveChat] = React.useState<Conversation | null>(null);
  const theme = useTheme();

  const getAvatarIcon = (conv: Conversation) => {
    if (conv.isBot) return <SmartToy />;
    return <Person />;
  };

  const getAvatarColor = (conv: Conversation) => {
    if (conv.isBot) return theme.palette.primary.main;
    const colors = [
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.secondary.main,
    ];
    return colors[conv.id.charCodeAt(0) % colors.length];
  };

  return (
    <PageContainer>
      <PageHeader
        title="Messages"
        subtitle={
          activeChat ? `${activeChat.name}` : "Stay connected with your team"
        }
      />

      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "calc(100vh - 200px)",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {/* Sidebar (chat list) */}
        <Box
          sx={{
            flex: { xs: "none", md: "0 0 360px" },
            overflowY: "auto",
            display: activeChat && { xs: "none", md: "block" },
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Sidebar Header */}
          <Box
            sx={{
              p: 3,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
              Conversations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockConversations.length} active chats
            </Typography>
          </Box>

          <List sx={{ p: 1 }}>
            {mockConversations.map((conv, index) => (
              <ListItemButton
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                selected={activeChat?.id === conv.id}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  p: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                  "&.Mui-selected": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                  },
                }}
              >
                <Badge
                  color="success"
                  invisible={!conv.isOnline}
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
                      bgcolor: getAvatarColor(conv),
                      mr: 2,
                      width: 48,
                      height: 48,
                      boxShadow: `0 2px 8px ${alpha(getAvatarColor(conv), 0.3)}`,
                    }}
                  >
                    {getAvatarIcon(conv)}
                  </Avatar>
                </Badge>

                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        sx={{
                          color: conv.unreadCount
                            ? "text.primary"
                            : "text.primary",
                          fontSize: "0.95rem",
                        }}
                      >
                        {conv.name}
                      </Typography>
                      {conv.isBot && (
                        <Chip
                          label="AI"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                            color: theme.palette.primary.main,
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontWeight: conv.unreadCount ? 500 : 400,
                          mb: 0.5,
                        }}
                      >
                        {conv.lastMessage}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {conv.lastActive}
                      </Typography>
                    </Box>
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {conv.unreadCount && (
                    <Badge
                      badgeContent={conv.unreadCount}
                      color="primary"
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                          fontWeight: 600,
                          minWidth: 20,
                          height: 20,
                        },
                      }}
                    />
                  )}
                  <IconButton size="small" sx={{ opacity: 0.5 }}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Chat Interface */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: alpha(theme.palette.background.default, 0.3),
          }}
        >
          {activeChat ? (
            <ChatInterface
              initialMessages={activeChat.messages}
              onBack={() => setActiveChat(null)}
              chatName={activeChat.name}
              isBot={activeChat.isBot}
              isOnline={activeChat.isOnline}
            />
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
                p: 4,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <MessageIcon
                  sx={{
                    fontSize: 48,
                    color: theme.palette.primary.main,
                    opacity: 0.7,
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color="text.primary"
                sx={{ mb: 1 }}
              >
                Welcome to Messages
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 400, lineHeight: 1.6 }}
              >
                Select a conversation from the sidebar to start chatting with
                your team or AI assistant
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </PageContainer>
  );
}
