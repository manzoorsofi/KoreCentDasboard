"use client";

import React from "react";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource: string, init?: RequestInit) =>
          fetch(resource, init).then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          }),
        revalidateOnFocus: false,
        dedupingInterval: 1000,
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
