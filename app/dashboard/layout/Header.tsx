"use client";

import { useState } from "react";
import { useTheme } from "@/app/hooks/use-theme";
import { Bell, ChevronLeft, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-950">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={collapsed ? "rotate-180" : ""} />
        </button>

        {/* Input con animación */}
        <motion.div
          className="relative flex items-center overflow-hidden rounded-md border border-slate-300 bg-white px-2 transition-all dark:bg-slate-800"
          animate={{ width: isFocused ? 240 : 160, height: 35 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Search
            size={20}
            className="text-slate-400"
          />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-400 dark:text-slate-300"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </motion.div>
      </div>

      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun
            size={20}
            className="dark:hidden"
          />
          <Moon
            size={20}
            className="hidden dark:block"
          />
        </button>
        <button className="btn-ghost size-10">
          <Bell size={20} />
        </button>
        <button className="size-10 overflow-hidden rounded-full">
          <Image
            src="/profile-image.jpg"
            alt="Perfil"
            width={40}
            height={40}
            className="size-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
