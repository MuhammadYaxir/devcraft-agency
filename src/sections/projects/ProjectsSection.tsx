"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Optimization: Next.js Image

const projects = [
  {
    id: "ramp-financial",
    title: "Ramp Financial",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=1000&auto=format&fit=crop",
    description: "The ultimate corporate card and spend management platform designed for speed.",
    link: "https://ramp.com",
  },
  {
    id: "oryzo-retail",
    title: "Oryzo Retail",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    description: "An immersive, award-winning shopping experience built with high-end WebGL.",
    link: "https://oryzo.com",
  },
  {
    id: "linear-app",
    title: "Linear App",
    category: "Dashboards",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
    description: "The gold standard for modern software development and issue tracking.",
    link: "https://linear.app",
  },
  {
    id: "visit-norway",
    title: "Visit Norway",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1520645521318-f03a712f0e67?q=80&w=1000&auto=format&fit=crop",
    description: "A serene, editorial-style travel guide showcasing cinematic visuals of Norway.",
    link: "https://www.visitnorway.com",
  },
  {
    id: "loom-video",
    title: "Loom Platform",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
    description: "Async video messaging for modern teams to communicate faster and better.",
    link: "https://www.loom.com",
  },
  {
    id: "framer-web",
    title: "Framer Site",
    category: "Websites",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGF0YSUyMGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Pushing the boundaries of web animation and interactive site design.",
    link: "https://www.framer.com",
  },
  {
    id: "stripe-press",
    title: "Stripe Press",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=1000&auto=format&fit=crop",
    description: "A premium book storefront with custom typography and smooth commerce flows.",
    link: "https://press.stripe.com",
  },
  {
    id: "vercel-v0",
    title: "Vercel v0",
    category: "Dashboards",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    description: "Generative UI dashboard that transforms text prompts into polished React code.",
    link: "https://v0.dev",
  }
];

const categories = ["All", "Websites", "SaaS", "E-Commerce", "Dashboards"];

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.filter((project) =>
    activeTab === "All" ? true : project.category === activeTab
  );

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400"
          >
            OUR WORK
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">Featured Projects</h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">Explore our portfolio of high-impact digital products.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                activeTab === cat
                  ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-purple-500/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent opacity-90" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                    {project.category}
                  </span>

                  {/* Play/View Overlay (Visual Luxury) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <PlayCircle className="text-white/80 w-12 h-12" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                    >
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                    <Link 
                      href={`/projects/${project.id}`}
                      className="px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/30 text-white text-[10px] font-bold rounded-lg transition-all"
                    >
                      Case Study
                    </Link>
                  </div>
                </div>

                {/* Subtle Interior Glow on Hover */}
                <div className="absolute -inset-[100%] group-hover:inset-0 pointer-events-none bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transition-all duration-700 skew-x-12" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;