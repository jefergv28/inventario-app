"use client";

import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <SessionProvider>{children}</SessionProvider>
    </CookiesProvider>
  );
}
