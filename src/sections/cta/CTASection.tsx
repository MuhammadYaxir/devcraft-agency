"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const particles = [
  { top: "12%", left: "18%", duration: 6 },
  { top: "28%", left: "76%", duration: 8 },
  { top: "68%", left: "22%", duration: 7 },
];

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050816] py-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-purple-600/20 blur-[80px]"
        />

        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] h-[45%] w-[45%] rounded-full bg-blue-600/10 blur-[70px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] px-8 py-20 text-center backdrop-blur-2xl md:py-28"
        >
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.5em] text-purple-500">
              LET&apos;S WORK TOGETHER
            </span>

            <h2 className="mb-8 text-4xl font-bold leading-[1.1] text-white md:text-6xl">
              Ready To Build Your Next <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                Digital Experience?
              </span>
            </h2>

            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
              Join forward-thinking brands and let&apos;s craft a
              high-performance digital product that scales with your ambition.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-4 font-bold text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:scale-95"
              >
                Start Your Project
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="https://calendly.com/yasirtech129/free-project-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-white/10 active:scale-95"
              >
                <Calendar size={18} />
                Schedule A Call
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            {particles.map((particle, index) => (
              <motion.div
                key={`${particle.top}-${particle.left}`}
                animate={{ y: [0, -32, 0], opacity: [0, 0.45, 0] }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: index * 1.5,
                  ease: "easeInOut",
                }}
                className="absolute h-1 w-1 rounded-full bg-purple-500"
                style={{
                  top: particle.top,
                  left: particle.left,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}