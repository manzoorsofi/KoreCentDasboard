"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";

interface AuthState {
  isAuthenticated: boolean;
  userEmail?: string;
}

interface AuthContextType extends AuthState {
  login: (email: string) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "auth-state";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw =
        typeof window !== "undefined"
          ? window.localStorage.getItem(AUTH_STORAGE_KEY)
          : null;
      if (raw) {
        const parsed = JSON.parse(raw) as AuthState;
        setAuth(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } catch {}
  }, [auth, mounted]);

  // Simple client-only guard: redirect unauthenticated users away from main app routes
  useEffect(() => {
    if (!mounted) return;
    const isAuthRoute = pathname?.startsWith(ROUTES.LOGIN);
    const isMainRoute = [
      ROUTES.DASHBOARD,
      ROUTES.REPORTS,
      ROUTES.CHAT,
      ROUTES.SETTINGS,
    ].some(r => pathname?.startsWith(r));
    if (!auth.isAuthenticated && isMainRoute) {
      router.replace(ROUTES.LOGIN);
    }
    if (auth.isAuthenticated && isAuthRoute) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [auth.isAuthenticated, pathname, router, mounted]);

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: auth.isAuthenticated,
      userEmail: auth.userEmail,
      login: (email: string) =>
        setAuth({ isAuthenticated: true, userEmail: email }),
      logout: () => setAuth({ isAuthenticated: false }),
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
