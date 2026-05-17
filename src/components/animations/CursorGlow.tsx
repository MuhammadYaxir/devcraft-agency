"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // High-performance motion values that don't trigger React re-renders on mouse move
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics-based spring configuration for that luxurious "delayed elasticity" look
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Check if device is mobile/touch-enabled
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      
      // Inject global styling to hide native cursor only on desktop
      if (!mobile) {
        document.documentElement.classList.add("desktop-custom-cursor");
      }
    };

    checkDevice();

    if (isMobile) return;

    // 2. Track mouse position
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // 3. Track global hover events for any interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("desktop-custom-cursor");
    };
  }, [isVisible, isMobile, cursorX, cursorY]);

  // Completely omit rendering on mobile/touch screens
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Large Outer Soft Purple Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-purple-500/15 rounded-full blur-[30px] pointer-events-none z- -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* 2. Small, Crisp Futuristic Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] pointer-events-none z- -translate-x-1/2 -translate-y-1/2"
        style={{
          // Core dot stays perfectly locked to mouse coordinates for precision, or uses very tight spring
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "#c084fc" : "#a855f7",
        }}
      />
    </>
  );
}