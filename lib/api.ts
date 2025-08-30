import { API_ENDPOINTS } from "./constants";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function fetchUsers(): Promise<ApiResponse<User[]>> {
  try {
    const response = await fetch(API_ENDPOINTS.USERS);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
