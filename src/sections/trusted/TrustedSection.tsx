"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const partners = [
  { 
    name: "Vercel", 
    logo: "https://www.vectorlogo.zone/logos/vercel/vercel-ar21.svg",
    isVercel: true 
  },
  { 
    name: "Next.js", 
    logo: "https://www.vectorlogo.zone/logos/nextjs/nextjs-ar21.svg" 
  },
  { 
    name: "Tailwind CSS", 
    logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg" 
  },
  { 
    name: "Supabase", 
    logo: "https://www.vectorlogo.zone/logos/supabase/supabase-ar21.svg" 
  },
  { 
    name: "MongoDB", 
    logo: "https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" 
  },
  { 
    name: "Stripe", 
    logo: "https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" 
  },
];

const TrustedSection = () => {
  // Mouse movement values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      onMouseMove={onMouseMove}
      className="relative w-full py-14 bg-[#050816] overflow-hidden group/section"
    >
      {/* 1. Static radial glow (The base lift) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-32 bg-purple-900/5 blur-[120px] pointer-events-none" />

      {/* 2. INTERACTIVE CURSOR GLOW (The animation you wanted back) */}
      <motion.div
        className="pointer-events-none absolute z-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px] opacity-0 group-hover/section:opacity-100 transition-opacity duration-500"
        style={{
          left: smoothX,
          top: smoothY,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/5 bg-white/[0.01] py-10 px-4 backdrop-blur-sm overflow-hidden"
        >
          {/* Subtle animated border spotlight */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
                background: useTransform(
                    [smoothX, smoothY],
                    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 40%)`
                )
            }}
          />

          <div className="text-center mb-10 relative z-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400/60">
              Trusted by businesses worldwide
            </span>
          </div>

          {/* Logo Container */}
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14 lg:gap-20 relative z-10">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center opacity-40 grayscale brightness-150 contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-200 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`${
                      partner.isVercel ? "h-9 md:h-10" : "h-11 md:h-13"
                    } w-auto object-contain filter invert opacity-90 group-hover:opacity-100`}
                  />
                  
                  {/* Individual icon hover glow */}
                  <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default TrustedSection;