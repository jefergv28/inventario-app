// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import SessionWrapper from "./SessionWrapper"; // 👈 Importa el wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventario-Pro",
  description: "Software de gestión de inventarios eficiente y fácil de usar. Controla tus productos, proveedores y movimientos en un solo lugar.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} bg-body bg-cover bg-no-repeat antialiased`}>
        <SessionWrapper>
          {" "}
          {/* ✅ Aquí sí lo usamos */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
