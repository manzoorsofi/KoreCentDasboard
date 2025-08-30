"use client";

import useSWR from "swr";
import { API_ENDPOINTS } from "@/lib/constants";
import { type User } from "@/types";

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    API_ENDPOINTS.USERS
  );
  return {
    users: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}

export default useUsers;
