"use client";

import React from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* 1. Underlying Purple Neon Ambient Glow */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-md opacity-40 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 pointer-events-none" 
      />

      {/* 2. Interactive Button Layer */}
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-semibold text-sm tracking-wide rounded-xl border border-purple-400/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-purple-400/50 transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 overflow-hidden"
      >
        {/* Subtle internal futuristic shine swipe overlay */}
        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out]" />
        
        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wider">
          {children}
        </span>
      </motion.button>
    </div>
  );
}