"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderScreenProps {
  onComplete?: () => void;
}

export default function LoaderScreen({ onComplete }: LoaderScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
      document.body.style.overflow = "unset";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  // Separate character arrays for animation tracking
  const logoTextArray = ["D", "e", "v"];
  const gradientTextArray = ["C", "r", "a", "f", "t"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z- flex flex-col items-center justify-center bg-[#050816] backdrop-blur-md"
        >
          {/* Ambient Background Glow Layer */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"
          />

          {/* Central Content */}
          <div className="flex flex-col items-center gap-6 relative z-10 select-none">
            
            {/* 1. Brand Heading Reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center"
            >
              {/* White Text Segment: "Dev" */}
              <span className="flex text-white">
                {logoTextArray.map((char, index) => (
                  <motion.span key={`dev-${index}`} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </span>
              
              {/* Premium Purple Gradient Segment: "Craft" */}
              <span className="flex bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent px-[2px]">
                {gradientTextArray.map((char, index) => (
                  <motion.span 
                    key={`craft-${index}`} 
                    variants={letterVariants}
                    className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* 2. Loading Spinner */}
            <div className="relative w-12 h-12 mt-2">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border-t border-r border-transparent border-t-purple-500 border-r-purple-500/40 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
              />
            </div>

            {/* 3. Luxury Micro Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[9px] font-medium tracking-[0.6em] uppercase text-gray-500 mt-2 pl-[0.6em]"
            >
              Initializing Core
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}