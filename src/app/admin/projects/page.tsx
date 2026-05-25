"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Search,
  Filter,
  FolderGit2,
  Edit,
  Trash2,
  Calendar,
  Layers,
  ExternalLink,
  Loader2,
  AlertTriangle,
  FolderOpen,
  Star
} from "lucide-react";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: "draft" | "published";
  featured: boolean;
  createdAt: string;
}

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Filtering and Searching parameters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Deletion Subsystem Local State Configurations
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchProjectCollection = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch("/api/projects", { method: "GET" });
      const json = await response.json();
      
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to aggregate system pipeline indexes.");
      }
      setProjects(json.data || []);
    } catch (err: any) {
      console.error("Aggregation pipeline processing failure:", err);
      setFetchError(err.message || "A network breakdown disrupted datastore synchronization.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectCollection();
  }, []);

  const handleConfirmedDelete = async () => {
    if (!deleteTarget) return;
    
    const targetId = deleteTarget._id;
    setIsDeleting(true);
    
    // Optimistic cache fallback array context
    const fallbackBackupState = [...projects];

    try {
      // 1. Instantly apply an optimistic UI filter shift
      setProjects((prev) => prev.filter((item) => item._id !== targetId));
      setDeleteTarget(null);

      // 2. Dispatch write-purge downstream execution call
      const response = await fetch(`/api/projects/${targetId}`, { method: "DELETE" });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Server transaction rejection.");
      }
    } catch (err: any) {
      console.error("Purge matrix pipeline crash. Restoring memory map states:", err);
      alert(`Purge Interrupted: ${err.message || "Database cluster rejected operational command workflow."}`);
      setProjects(fallbackBackupState);
    } finally {
      setIsDeleting(false);
    }
  };

  // Real-time local compute stream filtration layer
  const processedProjects = projects.filter((project) => {
    const evaluatesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.category.toLowerCase().includes(searchQuery.toLowerCase());
    const evaluatesStatus = statusFilter === "all" || project.status === statusFilter;
    return evaluatesSearch && evaluatesStatus;
  });
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 sm:p-10 relative overflow-hidden font-sans select-none">
      
      {/* Background Ambient Lightning Configurations */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.02] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header Interface Bar Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Portfolio <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Console</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">Manage showcase properties, case studies, and code architecture deployments.</p>
          </div>

          <Link href="/admin/projects/create">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-xs py-3.5 px-5 rounded-xl flex items-center gap-2 shadow-[0_4px_12px_rgba(147,51,234,0.2)] group outline-none"
            >
              <PlusCircle size={15} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Register New Project</span>
            </motion.button>
          </Link>
        </div>

        {/* Dynamic Real-time Parameters Filtration Unit Chassis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl backdrop-blur-xl">
          <div className="relative md:col-span-2 group">
            <Search size={15} className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search concepts dynamically by mapping matching title or taxonomy properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all"
            />
          </div>

          <div className="relative">
            <Filter size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-400 outline-none focus:border-purple-500/30 appearance-none cursor-pointer transition-all"
            >
              <option value="all">Display All Portfolio Items</option>
              <option value="published">Status: Live Distributions</option>
              <option value="draft">Status: Sandbox System Drafts</option>
            </select>
          </div>
        </div>

        {/* Global Pipeline Sync Error Output Notifications */}
        {fetchError && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <AlertTriangle size={14} /> <span>{fetchError}</span>
          </div>
        )}

        {/* Display Rendering Dashboard Stream Logic */}
        {isLoading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((sIndex) => (
      <div
        key={sIndex}
        className="h-48 rounded-2xl bg-white/[0.01] border border-white/[0.03] p-5 space-y-4 animate-pulse"
      >
        <div className="h-4 bg-white/5 rounded w-1/4" />
        <div className="h-6 bg-white/5 rounded w-5/6" />
        <div className="h-10 bg-white/5 rounded w-full" />
      </div>
    ))}
  </div>
        ) : processedProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 bg-white/[0.005]"
          >
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-full text-gray-500">
              <FolderOpen size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase tracking-wider">No Portfolio Nodes Manifested</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">No matching entries are registered into this view layout boundary.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {processedProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.25)" }}
                className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between h-52 group relative overflow-hidden transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="text-purple-400 flex items-center gap-1">
                      <Layers size={11} /> {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span className="p-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400" title="Featured Display Case">
                          <Star size={10} fill="currentColor" />
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full border text-[9px] uppercase font-bold tracking-wider ${
                        project.status === "published" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base leading-snug group-hover:text-purple-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>

                <div className="pt-4 border-t border-white/[0.03] flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 flex items-center gap-1 font-medium">
                    <Calendar size={11} /> {new Date(project.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </span>

                  <div className="flex items-center gap-1.5 relative z-20">
                    <button  onClick={() =>
      router.push(`/admin/projects/edit/${project._id}`)} className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors outline-none">
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(project)}
                      className="p-2 rounded-lg bg-white/[0.02] hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-colors outline-none"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* --- Destructive Phase Confirming Dialog Window Modal --- */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              className="bg-[#0b0e22] border border-white/10 w-full max-w-sm rounded-2xl p-6 relative z-10 space-y-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-3 text-red-400">
                <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
                  <AlertTriangle size={18} />
                </div>
                <h4 className="font-extrabold tracking-tight">Purge Portfolio Asset</h4>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                Confirm elimination of <span className="text-white font-bold">"{deleteTarget.title}"</span>? This systematically wipes historical write streams and metrics from system nodes.
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  disabled={isDeleting}
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs py-2.5 rounded-xl transition-all outline-none"
                >
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={handleConfirmedDelete}
                  className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(220,38,38,0.25)] flex items-center justify-center gap-1 outline-none disabled:opacity-50"
                >
                  {isDeleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  <span>Wipe Node</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}