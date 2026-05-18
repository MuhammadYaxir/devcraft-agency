"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const x = useSpring(cursorX, { damping: 30, stiffness: 300 });
  const y = useSpring(cursorY, { damping: 30, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-24 h-24 rounded-full bg-purple-500/30 blur-2xl pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ x, y }}
    />
  );
}