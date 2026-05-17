"use client";

import React from "react";
import { motion } from "framer-motion";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function SecondaryButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: SecondaryButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`
        relative 
        px-8 
        py-4 
        bg-white/[0.03] 
        hover:bg-white/[0.06]
        backdrop-blur-md 
        hover:backdrop-blur-lg
        text-white 
        font-semibold 
        text-sm 
        tracking-wide 
        rounded-xl 
        border 
        border-white/10 
        hover:border-purple-500/40 
        shadow-[0_4px_30px_rgba(0,0,0,0.4)]
        hover:shadow-[0_0_20px_rgba(147,51,234,0.15)]
        transition-all 
        duration-300 
        disabled:opacity-40 
        disabled:pointer-events-none 
        flex 
        items-center 
        justify-center 
        gap-2 
        overflow-hidden
        group
        ${className}
      `}
    >
      {/* Dynamic ambient highlight corner sweep */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-purple-500/5 to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Button Text/Icon Content Container */}
      <span className="relative z-10 flex items-center gap-2 font-medium tracking-wider">
        {children}
      </span>
    </motion.button>
  );
}