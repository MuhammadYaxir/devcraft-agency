"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const calendlyLink = "https://calendly.com/craftodev/30min";

const HeroSection = () => {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#F7FBFF] pt-24 text-[#05070D]">
      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAF6FF]" />

      {/* Crystal Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute right-[-120px] top-[-80px] hidden h-[950px] w-[1500px] bg-contain bg-center bg-no-repeat lg:block xl:right-[-20px]"
        style={{
          backgroundImage: "url('/hero-crystal-fulll.webp')",
        }}
      />

      {/* Small Decorative Dots */}
      <div className="absolute left-[53%] top-[36%] hidden h-2 w-2 rounded-full bg-cyan-400 lg:block" />
      <div className="absolute left-[60%] top-[48%] hidden h-1.5 w-1.5 rounded-full bg-cyan-400 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[760px]"
        >
          <div className="mb-6 flex items-center gap-2">
            <span className="text-[#1463FF]">✦</span>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1463FF] sm:text-[11px]">
              AI-Powered Digital Agency
            </span>
          </div>

          <h1 className="text-[46px] font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#05070D] sm:text-[64px] md:text-[78px] lg:text-[92px] xl:text-[104px]">
            Digital <br />
            Experiences <br />
            That Move <br />
            <span className="text-[#1463FF]">Businesses</span>
          </h1>

          <p className="mt-6 max-w-[500px] text-[15px] font-medium leading-7 text-[#4B5563] sm:text-base">
            We design and build AI-powered websites, automation systems and
            digital products that drive real growth.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="https://wa.me/923000907547"
              target="_blank"
              className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaWhatsapp size={20} />
              WhatsApp Us
            </Link>

            <Link
              href={calendlyLink}
              target="_blank"
              className="group inline-flex items-center gap-3 rounded-full border border-[#1463FF]/15 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#1463FF] shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1463FF] hover:bg-[#1463FF] hover:text-white"
            >
              <CalendarDays size={16} />
              Book Free 30 Min Call
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D9E3F0] bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#05070D] shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1463FF]/40 hover:text-[#1463FF]"
            >
              View Work
              <ArrowUpRight
                size={15}
                strokeWidth={3}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;