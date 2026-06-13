"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-4 left-0 z-[9999] w-full px-4 md:hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/contact">
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1463FF] to-[#05C8F7] py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_10px_40px_rgba(20,99,255,0.35)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(20,99,255,0.45)]">
            Start Your Project
            <ArrowRight size={18} />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}