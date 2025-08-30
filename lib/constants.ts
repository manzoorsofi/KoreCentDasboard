export const API_ENDPOINTS = {
  USERS: "https://jsonplaceholder.typicode.com/users",
} as const;

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REPORTS: "/reports",
  CHAT: "/chat",
  SETTINGS: "/settings",
} as const;

export const PAGINATION_OPTIONS = [10, 25, 50] as const;

export const DEBOUNCE_DELAY = 250; // milliseconds

export const ANIMATION_DURATION = 200; // milliseconds
