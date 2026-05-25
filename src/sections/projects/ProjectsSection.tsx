"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, PlayCircle, Search, Cpu, Loader2, FolderOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- TypeScript System Schema ---
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
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // --- Dynamic API Ingestion Pipeline ---
  useEffect(() => {
    const fetchSystemProjects = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch("/api/projects?status=published", { method: "GET" });
        const json = await response.json();

        if (json.success && Array.isArray(json.data)) {
          const fetchedData: Project[] = json.data;
          
          // Isolate distinctive taxonomy categories dynamically from live DB entries
          const dynamicCategories = Array.from(
            new Set(fetchedData.map((p) => p.category || "Uncategorized"))
          ).filter(Boolean);

          setCategories(["All", ...dynamicCategories]);
          setProjects(fetchedData);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error("Failed aggregating runtime home data metrics:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSystemProjects();
  }, []);

  // --- Search & Categorization Compute Stream ---
  const processedProjects = projects
    .filter((project) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      const matchesTab = activeTab === "All" || project.category === activeTab;

      return matchesSearch && matchesTab;
    })
    // 1. Position critical featured === true assets on top
    // 2. Sort trailing nodes symmetrically by timestamp
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Section Header Text Block */}
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400"
          >
            OUR WORK
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">Featured Projects</h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm">Explore our portfolio of high-impact digital products.</p>
        </div>

        {/* --- Interactive Filters Ribbon (Search + Categories Grid Alignment) --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
          {/* Dynamic Filter Option Tabs */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeTab === cat
                    ? "bg-purple-600/10 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.15)]"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Integrated Search Input Element */}
          <div className="relative w-full md:w-64 order-1 md:order-2 group">
            <Search size={14} className="absolute left-3.5 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by tech, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090c22]/50 border border-white/5 focus:border-purple-500/20 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-600 outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* DYNAMIC TEMPLATE RENDER MATRIX LAYER                      */}
        {/* ========================================================= */}
        {isLoading ? (
          /* Loading Skeleton Framework Placeholder Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="h-[430px] bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-4 animate-pulse">
                <div className="h-44 w-full bg-white/5 rounded-xl" />
                <div className="h-4 bg-white/5 rounded w-1/3" />
                <div className="h-5 bg-white/5 rounded w-3/4" />
                <div className="h-12 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        ) : hasError || processedProjects.length === 0 ? (
          /* Empty / Exception States Terminal Error Output UI */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-white/5 rounded-2xl p-16 text-center max-w-sm mx-auto flex flex-col items-center justify-center space-y-4 bg-white/[0.002]"
          >
            <div className="p-3 bg-white/5 border border-white/5 rounded-full text-gray-500">
              <FolderOpen size={24} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">No Target Cases Found</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">No matching system architectures align with your search variables.</p>
            </div>
          </motion.div>
        ) : (
          /* Live Content Processing Grid Chassis */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {processedProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md hover:border-purple-500/30 transition-all duration-500 h-[440px]"
                >
                  {/* Image Container Window */}
                  <div className="relative h-48 overflow-hidden bg-white/[0.01]">
                    <Image
                      src={project.featuredImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85]"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent opacity-90" />
                    
                    {/* Upper Floating Badge Info Ribbon */}
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/40 backdrop-blur-md border border-white/5 rounded-md text-[9px] font-black text-purple-400 uppercase tracking-wider">
                      {project.category}
                    </span>

                    {/* Standard Visual Luxury View Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                       <PlayCircle className="text-white/40 w-10 h-10" />
                    </div>
                  </div>

                  {/* Body Descriptive Data Blocks */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div className="space-y-2">
                      <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-purple-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Lower Micro Techstack List Tags */}
                    <div className="flex flex-wrap gap-1 overflow-hidden max-h-[22px] my-3">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="inline-flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 bg-white/[0.01] border border-white/5 text-gray-500">
                          <Cpu size={7} /> {tech}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Interactive Trigger Toggles */}
                    <div className="flex items-center gap-2 mt-auto">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 shadow-md shadow-purple-900/20"
                        >
                          <span>Demo</span> <ArrowUpRight size={11} />
                        </a>
                      )}
                      <Link 
                        href={`/projects/${project.slug}`}
                        className="px-3 py-2 bg-white/5 border border-white/5 hover:border-white/20 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all text-center flex-1"
                      >
                        Analysis
                      </Link>
                    </div>
                  </div>

                  {/* Subtle Shimmer Interior Glow Overlay Effect */}
                  <div className="absolute -inset-[100%] group-hover:inset-0 pointer-events-none bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transition-all duration-700 skew-x-12" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- Bottom Layout Universal Call to Action Redirect --- */}
        {!isLoading && projects.length > 0 && (
          <div className="flex justify-center pt-4">
            <Link href="/projects">
              <button className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-purple-500/20 text-gray-400 hover:text-white text-xs font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 outline-none group/all">
                <span>View Complete Portfolio Deck</span>
                <ArrowUpRight size={14} className="text-gray-600 group-hover/all:text-purple-400 group-hover/all:translate-x-0.5 transition-all" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;