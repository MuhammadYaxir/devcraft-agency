"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
      onComplete?.();
      document.body.style.overflow = "unset";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(14px)",
            transition: { duration: 0.75, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f7fbff]"
        >
          {/* Soft Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:46px_46px]" />

          {/* Blue Glow Effects */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 h-[360px] w-[360px] rounded-full bg-blue-500/20 blur-[100px]"
          />

          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[110px]"
          />

          {/* Loader Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center rounded-[2rem] border border-blue-100 bg-white/80 px-10 py-9 shadow-[0_30px_90px_rgba(37,99,235,0.14)] backdrop-blur-xl"
          >
            {/* Animated Logo Wrapper */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-24 w-64 items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl"
              />

              <Image
  src="/craftodev-logo.webp"
  alt="CraftODev Logo"
  width={260}
  height={80}
  priority
  className="relative z-10 w-auto h-auto max-w-[180px] sm:max-w-[230px] object-contain"
 />
            </motion.div>

            {/* Loading Ring */}
            <div className="relative mt-5 h-12 w-12">
              <div className="absolute inset-0 rounded-full border border-blue-100" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="h-full w-full rounded-full border-2 border-transparent border-t-blue-600 border-r-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.25)]"
              />
            </div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-6 pl-[0.45em] text-[10px] font-semibold uppercase tracking-[0.45em] text-blue-500"
            >
              Building Experience
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}