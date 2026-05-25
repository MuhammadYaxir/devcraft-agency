"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Loader2,
  HelpCircle
} from "lucide-react";

// --- TypeScript System Models ---
interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
}

// --- Framer Motion Layout Motion Tweaks ---
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const individualCardVariants: Variants = {
  hidden: {
    y: 25,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function PublicProjectsListingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetchError, setHasFetchError] = useState<boolean>(false);

  // --- Data Pipeline Integration Hook ---
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        setHasFetchError(false);
        const response = await fetch("/api/projects?status=published", { method: "GET" });
        const json = await response.json();

        if (json.success && Array.isArray(json.data)) {
          setProjects(json.data);
        } else {
          setHasFetchError(true);
        }
      } catch (err) {
        console.error("Failed syncing public project matrix strings:", err);
        setHasFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // --- Real-time Multi-parameter Intersection Filter Engine ---
  const evaluatedProjects = projects.filter((project) => {
    const textQuery = searchQuery.toLowerCase();
    
    const matchesTitle = project.title.toLowerCase().includes(textQuery);
    const matchesCategory = project.category.toLowerCase().includes(textQuery);
    const matchesTechStack = project.techStack.some((tech) => 
      tech.toLowerCase().includes(textQuery)
    );

    return matchesTitle || matchesCategory || matchesTechStack;
  });

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#050816] text-white selection:bg-purple-500/30 selection:text-purple-200 font-sans relative overflow-x-hidden pt-28 pb-20">
      
      {/* Background Environmental Cinematic Lights */}
      <div className="absolute top-0 left-[-5%] w-[600px] h-[600px] bg-purple-600/[0.025] blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.02] blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 space-y-14">
        
        {/* ========================================================= */}
        {/* HERO HEADER SECTION & PIPELINE LOOKUP SEARCH BAR          */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.04] pb-10">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/[0.05] border border-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles size={12} />
              <span>Production Showcases</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
              Engineered <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-white bg-clip-text text-transparent">Artifacts</span>
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Explore our architectural builds, immersive user interfaces, and modular full-stack ecosystems deployed across modern cloud structures.
            </p>
          </div>

          {/* Premium Search Chassis Terminal */}
          <div className="relative w-full md:w-80 group">
            <Search size={16} className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by title, stack, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 focus:border-purple-500/30 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-600 outline-none backdrop-blur-xl transition-all shadow-inner"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYOUT VIEW RENDERING STREAM MATRIX                        */}
        {/* ========================================================= */}
        {isLoading ? (
          /* Loading Dashboard Skeletons Layer */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((skeletonIndex) => (
              <div key={skeletonIndex} className="h-[480px] rounded-2xl bg-white/[0.01] border border-white/[0.03] animate-pulse p-4 space-y-4">
                <div className="aspect-[16/10] w-full bg-white/5 rounded-xl" />
                <div className="h-4 bg-white/5 rounded w-1/4" />
                <div className="h-6 bg-white/5 rounded w-3/4" />
                <div className="h-16 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        ) : hasFetchError || evaluatedProjects.length === 0 ? (
          /* Empty / Exception Intercept Layout State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-white/[0.03] bg-white/[0.005] rounded-3xl p-16 text-center max-w-md mx-auto flex flex-col items-center justify-center space-y-4 backdrop-blur-xl"
          >
            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-full text-purple-400/60 shadow-[0_0_20px_rgba(147,51,234,0.15)]">
              <HelpCircle size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200">No Projects Found</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We couldn't locate any published applications or code specifications matching your criteria strings.
              </p>
            </div>
          </motion.div>
        ) : (
          /* Live Content Stream Grid View Chassis */
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {evaluatedProjects.map((project) => (
              <motion.article
                key={project._id}
                variants={individualCardVariants}
                whileHover={{ y: -6, borderColor: "rgba(147, 51, 234, 0.2)" }}
                className="bg-white/[0.01] border border-white/[0.04] rounded-2xl overflow-hidden backdrop-blur-2xl p-4 flex flex-col justify-between h-[500px] group transition-all duration-400 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.06)]"
              >
                <div className="space-y-4">
                  {/* Aspect Ratio Constraint Thumbnail Container */}
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden relative border border-white/5 bg-white/[0.01]">
                    <Image
                      src={project.featuredImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"}
                      alt={project.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-600 ease-out brightness-[0.9]"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#050816]/70 border border-white/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
                      <Layers size={10} /> <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Core Description Typography Space */}
                  <div className="space-y-2 px-1">
                    <h3 className="font-extrabold text-base tracking-tight leading-snug line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Horizontal Badge Wrap Stream */}
                  <div className="flex flex-wrap gap-1.5 px-1 pt-1 overflow-hidden max-h-[58px]">
                    {project.techStack.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-gray-400 hover:text-purple-300 hover:border-purple-500/20 transition-colors"
                      >
                        <Cpu size={8} className="text-gray-600 group-hover:text-purple-500" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Dashboard Actions Ribbon */}
                <div className="pt-4 border-t border-white/[0.03] mt-4 px-1 flex items-center gap-3">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <button className="w-full bg-white/[0.02] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all group/btn outline-none">
                      <span>Analyze Build</span>
                      <ArrowRight size={13} className="text-gray-500 group-hover/btn:text-purple-400 group-hover/btn:translate-x-0.5 transition-all" />
                    </button>
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <button className="p-3 rounded-xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 text-gray-400 hover:text-white transition-colors outline-none shadow-sm" title="Launch Production Live Deployment">
                        <ExternalLink size={13} />
                      </button>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div></>
  );
}