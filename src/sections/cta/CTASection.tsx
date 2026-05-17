"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      {/* Background Effects: Mesh & Glows */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main CTA Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl px-8 py-20 md:py-28 text-center"
        >
          {/* Internal Animated Mesh Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Label */}
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.5em] text-purple-500 mb-6 block"
            >
              LET'S WORK TOGETHER
            </motion.span>

            {/* Heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]"
            >
              Ready To Build Your Next <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                Digital Experience?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join forward-thinking brands and let's craft a high-performance digital product that scales with your ambition.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Primary Button */}
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center gap-2">
                <Link href="/contact" className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </button>

              {/* Secondary Button */}
              <a
  href="https://calendly.com/yasirtech129/free-project-consultation"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-lg active:scale-95 flex items-center gap-2"
>
  <Calendar size={18} />
  Schedule A Call
</a>
            </motion.div>
          </div>

          {/* Floating Particles (Simplified CSS Animation) */}
          <div className="absolute inset-0 pointer-events-none">
             {[...Array(5)].map((_, i) => (
               <motion.div
                key={i}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: i * 2,
                }}
                className="absolute w-1 h-1 bg-purple-500 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
               />
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}