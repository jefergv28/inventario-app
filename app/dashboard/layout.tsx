"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "./utils/cn";
import { useRouter, usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import { useClickOutside } from "../hooks/use-click-outside";
import { jwtDecode } from "jwt-decode";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);
  const sidebarRef = useRef<HTMLElement>(null!);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const isExpired = decoded.exp < Math.floor(Date.now() / 1000);

        if (isExpired) {
          toast.warning("Sesión expirada");
          localStorage.removeItem("accessToken");
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("accessToken");
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    checkToken();
    setTokenChecked(true);
    const interval = setInterval(checkToken, 300000); // 5 minutos
    return () => clearInterval(interval);
  }, [router, pathname]);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted || !tokenChecked) {
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
