"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlowCard({
  children,
  className = "",
  onClick,
}: GlowCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative 
        w-full 
        rounded-2xl 
        bg-white/[0.02] 
        backdrop-blur-xl 
        border 
        border-white/10 
        p-8 
        transition-all 
        duration-500 
        group 
        ${onClick ? "cursor-pointer" : ""} 
        ${className}
      `}
    >
      {/* 1. Radical Radial Glow Layer (Fades in on Hover) */}
      <div 
        className="
          absolute 
          inset-0 
          -z-10 
          rounded-2xl 
          bg-gradient-to-br 
          from-purple-600/10 
          to-indigo-600/0 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-500 
          pointer-events-none
        " 
      />

      {/* 2. Concentrated Border Glow Effect */}
      <div 
        className="
          absolute 
          inset-0 
          -z-10 
          rounded-2xl 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-500 
          pointer-events-none 
          shadow-[0_0_30px_rgba(147,51,234,0.15)]
          border 
          border-purple-500/30
        "
      />

      {/* Card Contents Wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}