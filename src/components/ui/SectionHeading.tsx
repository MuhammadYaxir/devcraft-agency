"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  // Staggered container variants for elegant sequential entry
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1], // Premium easeOutCubic curve
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 ${className}`}
    >
      {/* 1. Futuristic Tracking Tag Badge */}
      <motion.span
        variants={itemVariants}
        className="inline-block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.45em] text-purple-500 bg-purple-500/[0.03] border border-purple-500/10 px-4 py-1.5 rounded-full backdrop-blur-sm"
      >
        {badge}
      </motion.span>

      {/* 2. Main Title with High-Contrast Typography */}
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-6 tracking-tight leading-[1.1]"
      >
        {title}
      </motion.h2>

      {/* 3. Luxury Muted Sub-Description */}
      {description && (
        <motion.p
          variants={itemVariants}
          className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}