"use client";

import React from "react";
import { TextField, IconButton, Paper } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

export function MessageInput({
  onSend,
}: {
  onSend: (content: string) => void;
}) {
  const [value, setValue] = React.useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <Paper elevation={3} sx={{ p: 1, display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        placeholder="Type a message"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        inputProps={{ "aria-label": "Message input" }}
        multiline
        maxRows={3}
        variant="outlined"
        sx={{ mr: 1 }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        aria-label="Send message"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default MessageInput;
