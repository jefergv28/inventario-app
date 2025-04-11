"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { cn } from "./utils/cn";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import { useClickOutside } from "../hooks/use-click-outside";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);
  const sidebarRef = useRef<HTMLElement>(null!);

  // Esperar que NextAuth cargue, y redirigir si no hay sesión
  useEffect(() => {
    if (status === "unauthenticated") {
      const redirectPath = encodeURIComponent(pathname || "/");
      router.replace(`/auth/login?redirect=${redirectPath}`);
    }
  }, [status, router, pathname]);

  useEffect(() => setMounted(true), []);
  useEffect(() => setCollapsed(!isDesktopDevice), [isDesktopDevice]);

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

  if (!mounted || status === "loading" || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-accent_oscuro">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="page min-h-screen bg-slate-100 transition-colors dark:bg-accent_oscuro">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-10 bg-black opacity-0 transition-opacity",
          !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
        )}
      />

      <Sidebar
        ref={sidebarRef}
        collapsed={collapsed}
      />

      <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">{children}</div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
    </div>
  );
}
