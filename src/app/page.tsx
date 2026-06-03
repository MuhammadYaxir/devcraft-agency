"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import LoaderScreen from "@/components/loaders/LoaderScreen";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import HeroSection from "@/sections/hero/HeroSection";
import TrustedSection from "@/sections/trusted/TrustedSection";
import ProjectsSection from "@/sections/projects/ProjectsSection";
import ProcessSection from "@/sections/process/ProcessSection";
import TestimonialsSection from "@/sections/testimonials/TestimonialsSection";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && (
        <LoaderScreen
          onComplete={() => setShowLoader(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative min-h-screen overflow-hidden bg-[#050816] text-white"
      >
        <Navbar />

        <div className="pointer-events-none absolute left-1/2 top-[15%] h-[300px] w-full max-w-6xl -translate-x-1/2 rounded-full bg-purple-600/[0.02] blur-[80px]" />

        <main>
          <HeroSection />

          <TrustedSection />

          <ProjectsSection />

          <ProcessSection />

          <TestimonialsSection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}