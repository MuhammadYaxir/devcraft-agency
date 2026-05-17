"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Core Structural Layout Components
import LoaderScreen from "@/components/loaders/LoaderScreen";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// 2. Original Page Layout Sections (Preserved exact path structures)
import HeroSection from "@/sections/hero/HeroSection";
import TrustedSection from "@/sections/trusted/TrustedSection";
import ServicesSection from "@/sections/services/ServicesSection";
import ProjectsSection from "@/sections/projects/ProjectsSection";
import ProcessSection from "@/sections/process/ProcessSection";
import TestimonialsSection from "@/sections/testimonials/TestimonialsSection";
import FAQSection from "@/sections/faq/FAQSection";
import CTASection from "@/sections/cta/CTASection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fallback safety timeout (2.5 seconds matching the internal Loader Screen sync)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Monolithic Overlay Loader Layer */}
      <LoaderScreen onComplete={() => setIsLoading(false)} />

      {/* Page Content Transition Wrap */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 1, 0.5, 1] // Custom premium cubic-bezier easeOut curve
            }}
            className="w-full relative min-h-screen bg-[#050816] text-white overflow-hidden"
          >
            {/* Navbar rendered on top inside the animated main container */}
            <Navbar />

            {/* Ambient Background Glow Accent */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-purple-600/[0.02] blur-[150px] pointer-events-none rounded-full" />

            {/* Complete Structural Core Flow — Fully Intact */}
            <main>
              <HeroSection />
              
              <TrustedSection />
              
              <ServicesSection />
              
              <ProjectsSection />
              
              <ProcessSection />
              
              <TestimonialsSection />
              
              <FAQSection />
              
              <CTASection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}