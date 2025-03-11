"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "./utils/cn";

import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import { useClickOutside } from "../hooks/use-click-outside";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);
  const sidebarRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useEffect(() => {
    setMounted(true);
    console.log("DashboardLayout cargando...");
  }, []);

  useEffect(() => {
    if (mounted) {
      const query = "(min-width: 768px)";
      const matchMedia = window.matchMedia(query);
      setIsDesktopDevice(matchMedia.matches);

      const listener = () => setIsDesktopDevice(matchMedia.matches);
      matchMedia.addEventListener("change", listener);

      return () => matchMedia.removeEventListener("change", listener);
    }
  }, [mounted]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  if (!mounted) return null; // Evita errores de hidratación

  return (
    <div className="page min-h-screen bg-slate-100 transition-colors dark:bg-accent_oscuro">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-10 bg-black opacity-0 transition-opacity",
          !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
        )}
      />

      {/* Sidebar */}
      <Sidebar
        ref={sidebarRef}
        collapsed={collapsed}
      />

      <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
        {/* Header */}
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* 👇 Aquí se renderizan las páginas del dashboard */}
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">{children}</div>
      </div>
    </div>
  );
}
