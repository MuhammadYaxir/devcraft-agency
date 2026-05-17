"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis with premium SaaS configuration tuning
    const lenis = new Lenis({
      duration: 1.2,       // Speed of the scroll animation (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium ease-out function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,  // Adjust responsiveness to mouse wheels
      touchMultiplier: 2,  // Maintain snappy tactile scrolling on trackpads/touch
      infinite: false,
    });

    lenisRef.current = lenis;

    // 2. Setup the high-performance requestAnimationFrame loop
    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // 3. Clean up and destroy the instance on unmount to prevent memory leaks
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}