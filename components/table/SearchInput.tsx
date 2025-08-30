"use client";

import React, { useMemo } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { debounce } from "@/lib/utils";
import { DEBOUNCE_DELAY } from "@/lib/constants";

export function SearchInput({
  placeholder = "Search…",
  onSearch,
  defaultValue = "",
}: {
  placeholder?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
}) {
  const debounced = useMemo(
    () => debounce(onSearch, DEBOUNCE_DELAY),
    [onSearch]
  );

  return (
    <TextField
      fullWidth
      defaultValue={defaultValue}
      placeholder={placeholder}
      inputProps={{ "aria-label": "Search" }}
      onChange={e => debounced(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: "background.paper",
        },
      }}
    />
  );
}

export default SearchInput;
