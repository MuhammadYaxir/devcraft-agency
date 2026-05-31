"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[720px] max-h-[900px] overflow-hidden bg-white pt-24 text-[#05070D]">
      {/* Full Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-crystal-fulll.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r  to-white/5" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[760px] -translate-y-2"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1463FF] sm:text-[11px]">
              AI-Powered Digital Agency
            </span>
          </div>

          <h1 className="text-[44px] font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#05070D] sm:text-[62px] md:text-[76px] lg:text-[86px] xl:text-[96px]">
            Digital <br />
            Experiences <br />
            That Move <br />
            <span className="text-[#1463FF]">Businesses</span>
          </h1>

          <p className="mt-5 max-w-md text-base font-medium leading-7 text-[#4B5563] sm:text-lg">
            We design and build AI-powered websites, automation systems and
            digital products that drive real growth.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.12em] text-[#05070D]"
            >
              Let&apos;s Build Together
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#05070D] text-white transition-all duration-300 group-hover:bg-[#1463FF]">
                <ArrowRight
                  size={16}
                  strokeWidth={3}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#05070D]/10 bg-white/50 px-5 py-3 text-[12px] font-black uppercase tracking-[0.12em] text-[#05070D] backdrop-blur-md transition-all hover:border-[#1463FF] hover:text-[#1463FF]"
            >
              View Work
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;