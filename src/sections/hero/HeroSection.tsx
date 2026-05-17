"use client";

import React, { useRef } from "react";
import Image from "next/image"; // Added for optimized image loading
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Code, Zap, Globe, Database } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Projects Completed", value: "100+" },
  { label: "Years Experience", value: "2+" },
  { label: "Happy Clients", value: "50+" },
  { label: "Satisfaction", value: "99%" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the visual area
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050816] overflow-hidden pt-10 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
        
        {/* Subtle Particle Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        {/* LEFT SIDE: CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-200">
              Premium Web Development Agency
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            We Build Modern Digital{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] via-[#D8B4FE] to-[#8B5CF6] animate-gradient-x">
              Experiences
            </span>{" "}
            That Drive Results
          </h1>

          {/* Description */}
          <p className="max-w-xl text-lg text-gray-400 font-medium">
            Transforming ambitious ideas into high-performance digital products. 
            We combine luxury aesthetics with cutting-edge tech to help your brand lead the future.
          </p>

         {/* CTAs */}
<div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
  
  {/* Get Started */}
  <Link href="/contact" className="w-full sm:w-auto">
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      className="w-full px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full font-bold flex items-center justify-center gap-2 group transition-all"
    >
      Get Started
      <ArrowRight
        size={20}
        className="group-hover:translate-x-1 transition-transform"
      />
    </motion.button>
  </Link>

  {/* View Our Work */}
  <Link href="/projects" className="w-full sm:w-auto">
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      whileTap={{ scale: 0.95 }}
      className="w-full px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white rounded-full font-bold flex items-center justify-center gap-2"
    >
      <Play size={18} className="fill-white" />
      View Our Work
    </motion.button>
  </Link>

</div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 w-full mt-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex flex-col space-y-1"
              >
                <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE: VISUAL COMPOSITION WITH LAPTOP */}
        <div className="relative h-[500px] lg:h-[750px] w-full flex items-center justify-center">
          
          {/* Animated Orbit Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] border border-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] border border-white/5 rounded-full"
            />
          </div>

          {/* Floating Laptop Visual */}
          <motion.div
            style={{ y: y1 }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1, 0] // Subtle rotation for floating effect
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-[90%] md:w-[500px] aspect-[16/10] overflow-visible group"
          >
            {/* The actual image asset from the public folder */}
            <div className="relative w-full h-full p-2 bg-black rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                <Image 
                    src="/laptop.png" // Pointing to public/laptop.png
                    alt="Agency Projects Laptop"
                    fill
                    className="object-cover object-center rounded-xl opacity-90"
                    priority
                />
                
                {/* Overlay gradient over screen to enhance futuristic feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-transparent to-transparent"></div>
            </div>

            {/* Glowing effect under laptop */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-[#8B5CF6] blur-[60px] opacity-40 z-10"></div>
          </motion.div>

          {/* Floating Tech Icons */}
          <FloatingIcon
             icon={<Code className="text-blue-400" size={26} />}
             className="top-10 left-10 md:top-24 md:left-24"
             delay={0}
             yTransform={y2}
          />
          <FloatingIcon
             icon={<Zap className="text-yellow-400" size={26} />}
             className="bottom-10 right-10 md:bottom-28 md:right-28"
             delay={1.5}
             yTransform={y1}
          />
          <FloatingIcon
             icon={<Globe className="text-[#8B5CF6]" size={26} />}
             className="top-20 right-8 md:top-48 md:right-16"
             delay={3}
             yTransform={y2}
          />
          <FloatingIcon
             icon={<Database className="text-emerald-400" size={26} />}
             className="bottom-20 left-4 md:bottom-40 md:left-20"
             delay={4.5}
             yTransform={y1}
          />
        </div>
      </div>
    </section>
  );
};

// Helper Component for Floating Tech Icons
const FloatingIcon = ({
  icon,
  className,
  delay,
  yTransform
}: {
  icon: React.ReactNode;
  className: string;
  delay: number;
  yTransform: any;
}) => (
  <motion.div
    style={{ y: yTransform }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -15, 0],
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className={`absolute z-30 p-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl ${className}`}
  >
    {icon}
  </motion.div>
);

export default HeroSection;