"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FilePlus2,
  Globe,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function CreateBlogNodePage() {
  const router = useRouter();

  // Primary Content Field Form Targets
  const [title, setTitle] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [featuredImage, setFeaturedImage] = useState<string>("");
  const [category, setCategory] = useState<string>("Development");
  const [status, setStatus] = useState<string>("draft");

  // Auxiliary Optimization Metadata States
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  // System Pipeline Orchestration States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<boolean>(false);

  // --- Submission Write Pipeline ---
  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // 1. Client-Side Integrity Bounds Guard
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setErrorMessage("Validation Exception: Required database text content arrays cannot evaluate empty.");
      setIsLoading(false);
      return;
    }

    // 2. Data Modification Transformation: Convert split keyword string into text arrays
    const dynamicKeywordsVector = keywords
      ? keywords.split(",").map((word) => word.trim()).filter((word) => word.length > 0)
      : [];

    // 3. Assemble Structural Request Payload Document Matrix
    const blogSubmissionPayload = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      featuredImage: featuredImage.trim(),
      category,
      metaTitle: metaTitle.trim() || title.trim(), // Structural fallback mapping
      metaDescription: metaDescription.trim() || excerpt.trim(), // Structural fallback mapping
      keywords: dynamicKeywordsVector,
      status,
    };

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogSubmissionPayload),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "A database cluster layout exception blocked document ingestion.");
      }

      // 4. Trigger UI Success and Redirect Vector Tracking Lifecycle
      setSuccessToast(true);
      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1400);

    } catch (err: any) {
      console.error("Data post validation interrupt crash:", err);
      setErrorMessage(err.message || "An unhandled transaction pipeline crash occurred during execution.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 sm:p-10 relative overflow-hidden font-sans">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Real-time Dynamic Toast Notification Alerts */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-3.5 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.25)] text-xs font-bold uppercase tracking-wider backdrop-blur-md"
          >
            <CheckCircle2 size={16} />
            <span>Document Registered & Ingested into Database.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Breadcrumb Subsystem */}
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/blogs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5 text-gray-400 hover:text-white transition-colors outline-none"
              >
                <ArrowLeft size={16} />
              </motion.button>
            </Link>
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">Content Assembly Workshop</h1>
              <p className="text-[11px] text-gray-500 font-medium">Draft and inject secure cloud documentation modules.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Animated Form Processing Error Notification Panels */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-xs font-semibold leading-relaxed overflow-hidden"
            >
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Processing Chassis Form Grid */}
        <form onSubmit={handleFormSubmission} className="space-y-6">
          
          {/* Section Container 1: Core Target Metrics Blocks */}
          <div className="bg-white/[0.01] border border-white/[0.04] p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/[0.03] pb-3 mb-2 text-purple-400">
              <FilePlus2 size={16} />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">Primary Core Data</h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Document Title *</label>
              <input
                type="text"
                required
                disabled={isLoading}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Systems Integration Framework Guide"
                className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Taxonomy Category</label>
                <input
  type="text"
  disabled={isLoading}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  placeholder="Enter blog category..."
  className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder:text-gray-500 outline-none focus:border-purple-500/30 disabled:opacity-50 transition-all"
/>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Publish Matrix Status</label>
                <select
                  disabled={isLoading}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-gray-400 outline-none focus:border-purple-500/30 cursor-pointer disabled:opacity-50"
                >
                  <option value="draft">Save as Local Draft Node</option>
                  <option value="published">Deploy Public / Live</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Asset Featured Image URI Link</label>
              <input
                type="url"
                disabled={isLoading}
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-example"
                className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Brief Narrative Excerpt *</label>
              <textarea
                required
                rows={2}
                disabled={isLoading}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A precise macro analytical summary description of the article scope content parameters..."
                className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all resize-none disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Comprehensive Content Raw Payload *</label>
              <textarea
                required
                rows={10}
                disabled={isLoading}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="## Core Framework Definitions... Write the extensive body payload data modules here."
                className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all font-mono disabled:opacity-50"
              />
            </div>
          </div>

          {/* Section Container 2: Search Index Metadata Optimization Cards */}
          <div className="bg-white/[0.01] border border-white/[0.04] p-6 sm:p-8 rounded-2xl backdrop-blur-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/[0.03] pb-3 mb-2 text-indigo-400">
              <Globe size={15} />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">Discovery Engine Optimization (SEO Parameters)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Target Meta Title</label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="System Framework | DevCraft Optimization"
                  className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Indexing Keywords (Comma separated)</label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="nextjs15, devcraft, cloud-architecture"
                  className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Target Crawler Meta Description</label>
              <textarea
                rows={2}
                disabled={isLoading}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Search engine presentation capsule copy optimization text specifications."
                className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-500/30 transition-all resize-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submission Panel Execution Controls Menu Ribbon */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/admin/blogs">
              <button
                type="button"
                disabled={isLoading}
                className="bg-white/[0.02] hover:bg-white/5 border border-white/5 px-6 py-3.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all outline-none disabled:opacity-40"
              >
                Abort Draft
              </button>
            </Link>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={isLoading ? {} : { scale: 1.02, boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)" }}
              whileTap={isLoading ? {} : { scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs py-3.5 px-6 rounded-xl flex items-center gap-2 shadow-[0_4px_12px_rgba(147,51,234,0.25)] border-t border-white/10 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin text-purple-200" />
                  <span>Committing Data Streams...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Deploy Article Module</span>
                </>
              )}
            </motion.button>
          </div>

        </form>
      </div>
    </div>
  );
}