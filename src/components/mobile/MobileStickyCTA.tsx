"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-4 left-0 w-full px-4 z-[9999] md:hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/contact">
          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-sm shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2">
            Start Your Project
            <ArrowRight size={18} />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}