"use client";

import { forwardRef } from "react";
import { cn } from "../utils/cn";
import Image from "next/image";
import Link from "next/link"; // Importa Link de Next.js
import { navbarLinks } from "@/app/constants";

interface SidebarProps {
  collapsed?: boolean; // Especificamos que es un booleano opcional
}

const Sidebar = forwardRef<HTMLElement, SidebarProps>(({ collapsed }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-accent_oscuro",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:left-full" : "max-md:left-0",
      )}
    >
      {/* Logo */}
      <div className="relative flex h-[40px] w-full items-center justify-start gap-x-3 p-3">
        <Image
          src={"/logo2.svg"}
          alt={"logo"}
          width={40}
          height={40}
          className="object-contain"
        />
        {!collapsed && <p className="text-lg font-medium uppercase text-slate-900 transition-colors dark:text-slate-50">inventario-pro</p>}
      </div>
      <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
        {navbarLinks.map((navbarLink) => (
          <nav
            key={navbarLink.title}
            className={cn("sidebar-group", collapsed && "md:items-center")}
          >
            <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>{navbarLink.title}</p>
            {navbarLink.links.map((link) => (
              <Link
                key={link.label}
                href={link.path} // Usa href en lugar de to
                className={cn("sidebar-item", collapsed && "md:w-[45px]")}
              >
                {link.icon && (
                  <link.icon
                    size={22}
                    className="flex-shrink-0"
                  />
                )}
                {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
              </Link>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

// Asignando el displayName al componente
Sidebar.displayName = "Sidebar";

export default Sidebar;
