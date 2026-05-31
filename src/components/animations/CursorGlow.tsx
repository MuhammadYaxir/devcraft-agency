"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, {
    damping: 25,
    stiffness: 220,
    mass: 0.4,
  });

  const y = useSpring(mouseY, {
    damping: 25,
    stiffness: 220,
    mass: 0.4,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Main Glow */}
      <motion.div
        style={{ x, y }}
        className="
          fixed
          top-0
          left-0
          h-[280px]
          w-[280px]
          rounded-full
          pointer-events-none
          z-[1]
          hidden
          lg:block
          -translate-x-1/2
          -translate-y-1/2
          bg-blue-500/[0.10]
          blur-[120px]
        "
      />

      {/* Secondary Cyan Glow */}
      <motion.div
        style={{ x, y }}
        transition={{ duration: 0.2 }}
        className="
          fixed
          top-0
          left-0
          h-[180px]
          w-[180px]
          rounded-full
          pointer-events-none
          z-[1]
          hidden
          lg:block
          -translate-x-1/2
          -translate-y-1/2
          bg-cyan-400/[0.10]
          blur-[80px]
        "
      />

      {/* Tiny Core */}
      <motion.div
        style={{ x, y }}
        className="
          fixed
          top-0
          left-0
          h-3
          w-3
          rounded-full
          pointer-events-none
          z-[2]
          hidden
          lg:block
          -translate-x-1/2
          -translate-y-1/2
          bg-blue-500
          shadow-[0_0_20px_rgba(59,130,246,0.7)]
        "
      />
    </>
  );
}