"use client";

import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Database,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import PrimaryButton from "@/components/ui/PrimaryButton";

const coreSkills = [
  { name: "Next.js", desc: "App Router optimization, SSR/ISR architectures & static configurations.", icon: Cpu },
  { name: "React", desc: "High-performance state pipelines, component isolation & custom hooks.", icon: Code2 },
  { name: "TypeScript", desc: "Strict end-to-end interface typing, safety bounds & modular scaling.", icon: Terminal },
  { name: "Tailwind CSS", desc: "Fluid responsive layouts and custom brand theming.", icon: Layers },
  { name: "Node.js", desc: "Scalable runtime server architectures, secure endpoints & data parsing.", icon: Terminal },
  { name: "MongoDB", desc: "MERN pipeline structural schemas, clustering & data queries.", icon: Database },
  { name: "UI/UX Architecture", desc: "Luxury, cinematic micro-interactions, dark glassmorphism & layout flows.", icon: Palette },
  { name: "SEO Optimization", desc: "Next.js structural meta tags, indexing trees & core web vital metrics.", icon: TrendingUp },
];

const statisticalMetrics = [
  { value: "100+", metric: "Projects Engineered" },
  { value: "2+", metric: "Years Active Experience" },
  { value: "50+", metric: "Global Clients Served" },
  { value: "100%", metric: "On-Time Fast Delivery" },
];

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#050816] text-white pt-24 overflow-hidden relative">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-indigo-600/[0.02] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <section className="py-16 md:py-24 relative z-10">
          <Container>
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.45em] text-purple-400 bg-purple-500/[0.04] border border-purple-500/15 px-4 py-1.5 rounded-full backdrop-blur-sm"
              >
                About DevCraft
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white"
              >
                Building Premium <br />
                <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                  Digital Experiences
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-normal leading-relaxed pt-2"
              >
                We are a next-gen, full-stack web development agency. We synthesize modern engineering blueprints with high-end aesthetic frameworks to construct blazing fast corporate products.
              </motion.p>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 border-t border-white/[0.02] bg-white/[0.005]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="lg:col-span-5 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                  <Sparkles size={20} />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  The Vision & Code Base
                </h2>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Founded by lead full-stack engineer{" "}
                  <strong className="text-purple-300 font-semibold">
                    Muhammad Yasir
                  </strong>
                  , DevCraft was engineered from the ground up to solve a critical market issue: the disconnect between cinematic presentation and backend optimization.
                </p>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Leveraging expertise in{" "}
                  <span className="text-white font-medium">
                    Next.js, React, Tailwind CSS, and the MERN stack
                  </span>
                  , our agency builds responsive architecture designed to convert traffic into business growth.
                </p>
              </motion.div>

              <div className="lg:col-span-7">
                <GlowCard className="p-8 md:p-10 bg-white/[0.01] border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full" />

                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal size={18} className="text-purple-400" />
                    Core Engineering Protocol
                  </h3>

                  <div className="space-y-4">
                    {[
                      "Architecting Next.js layouts for search visibility.",
                      "Writing responsive layouts for all device sizes.",
                      "Building high-converting visual systems with fast asset loading.",
                      "Combining MERN data layers with premium design aesthetics.",
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-400 text-sm md:text-base">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-20 bg-gradient-to-b from-transparent via-purple-950/[0.02] to-transparent">
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center"
            >
              {statisticalMetrics.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUpVariants}
                  className="p-6 md:p-8 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm group hover:border-purple-500/20 transition-all duration-300"
                >
                  <h4 className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-r from-white via-purple-300 to-indigo-200 bg-clip-text text-transparent tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium tracking-wider uppercase">
                    {stat.metric}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        <section className="py-16 md:py-28 relative">
          <Container>
            <SectionHeading
              badge="Stack Matrix"
              title="Our Digital Weaponry"
              description="We build with advanced web systems to produce clean, scalable, high-performance digital products."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {coreSkills.map((skill, index) => {
                const IconComponent = skill.icon;

                return (
                  <motion.div key={index} variants={fadeInUpVariants}>
                    <GlowCard className="p-6 flex flex-col justify-between h-full bg-white/[0.01] border-white/5 group">
                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-purple-400 group-hover:border-purple-500/30 group-hover:bg-purple-500/[0.02] transition-all duration-300">
                          <IconComponent size={18} />
                        </div>

                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                          {skill.name}
                        </h3>

                        <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors">
                          {skill.desc}
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>

        <section className="py-16 md:py-24 border-t border-white/[0.02] relative">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-2">
                <Cpu size={16} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                The DevCraft Core Mission
              </h2>

              <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
                Our prime objective is simple:{" "}
                <span className="text-white font-medium">
                  to scale businesses online.
                </span>{" "}
                We replace outdated systems with high-converting custom applications that turn technology into measurable growth.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-32 border-t border-white/[0.02] bg-gradient-to-b from-transparent to-purple-950/[0.05]">
          <Container>
            <GlowCard className="p-8 md:p-16 text-center max-w-4xl mx-auto bg-gradient-to-br from-white/[0.01] to-purple-500/[0.01] border-white/5 relative overflow-hidden">
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                  Let’s Build Your <br />
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                    Next Digital Product
                  </span>
                </h2>

                <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                  Ready to secure your new product infrastructure? Connect with our team to map out a technical blueprint.
                </p>

                <div className="pt-4 flex justify-center">
                  <PrimaryButton onClick={() => (window.location.href = "/contact")}>
                    <span>Secure Technical Consult</span>
                    <ArrowRight size={14} />
                  </PrimaryButton>
                </div>
              </div>
            </GlowCard>
          </Container>
        </section>
      </div>

      <Footer />
    </>
  );
}