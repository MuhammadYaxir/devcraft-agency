"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Search,
  Filter,
  Layers,
  Edit,
  Trash2,
  Calendar,
  Loader2,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: "draft" | "published";
  createdAt: string;
}

interface BlogsApiResponse {
  success: boolean;
  data?: BlogItem[];
  error?: string;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "A network breakdown disrupted content synchronization.";
}

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deleteTarget, setDeleteTarget] = useState<BlogItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const loadBlogCollection = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const response = await fetch("/api/blogs", { method: "GET" });
      const json = (await response.json()) as BlogsApiResponse;

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to load core server index paths.");
      }

      setBlogs(json.data || []);
    } catch (err: unknown) {
      console.error("Aggregation pipeline failure:", err);
      setFetchError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadBlogCollection();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleConfirmedDelete = async () => {
    if (!deleteTarget) return;

    const targetedId = deleteTarget._id;
    setIsDeleting(true);

    const absoluteBackupState = [...blogs];

    try {
      setBlogs((prev) => prev.filter((item) => item._id !== targetedId));
      setDeleteTarget(null);

      const response = await fetch(`/api/blogs/${targetedId}`, {
        method: "DELETE",
      });

      const json = (await response.json()) as BlogsApiResponse;

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Server transaction rejection.");
      }
    } catch (err: unknown) {
      console.error("Purge operations crashed. Rolling back state maps:", err);
      alert(`Purge Interrupted: ${getErrorMessage(err)}`);
      setBlogs(absoluteBackupState);
    } finally {
      setIsDeleting(false);
    }
  };

  const evaluatedBlogs = blogs.filter((blog) => {
    const evaluatesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const evaluatesStatus =
      statusFilter === "all" || blog.status === statusFilter;

    return evaluatesSearch && evaluatesStatus;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] p-6 font-sans text-white sm:p-10">
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-purple-600/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.04] pb-6 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Blog Content{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Matrix
              </span>
            </h1>
            <p className="text-xs font-medium text-gray-400">
              Manage, synchronize, and update operational user-facing articles.
            </p>
          </div>

          <Link href="/admin/blogs/create">
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3.5 text-xs font-bold shadow-[0_4px_12px_rgba(147,51,234,0.2)] outline-none"
            >
              <PlusCircle
                size={15}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span>Assemble New Article</span>
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 backdrop-blur-xl md:grid-cols-3">
          <div className="group relative md:col-span-2">
            <Search
              size={15}
              className="absolute left-3.5 top-3.5 text-gray-500 transition-colors group-focus-within:text-purple-400"
            />
            <input
              type="text"
              placeholder="Filter instantly by specific article title properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-[#080b1e]/60 py-2.5 pl-10 pr-4 text-xs text-white outline-none transition-all placeholder:text-gray-600 focus:border-purple-500/30"
            />
          </div>

          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3.5 top-3.5 text-gray-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-white/5 bg-[#080b1e]/60 py-2.5 pl-10 pr-4 text-xs text-gray-400 outline-none transition-all focus:border-purple-500/30"
            >
              <option value="all">Display All Matrix Records</option>
              <option value="published">Status: Live / Published</option>
              <option value="draft">Status: Local System Draft</option>
            </select>
          </div>
        </div>

        {fetchError && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-400">
            <AlertTriangle size={14} />
            <span>{fetchError}</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((skeletonIndex) => (
              <div
                key={skeletonIndex}
                className="h-48 animate-pulse space-y-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] p-5"
              >
                <div className="h-4 w-1/4 rounded bg-white/5" />
                <div className="h-6 w-5/6 rounded bg-white/5" />
                <div className="h-10 w-full rounded bg-white/5" />
                <div className="h-4 w-2/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : evaluatedBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-white/5 bg-white/[0.005] p-12 text-center"
          >
            <div className="rounded-full border border-white/5 bg-white/[0.02] p-4 text-gray-500">
              <FolderOpen size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold uppercase tracking-wider">
                No Documentation Nodes Found
              </h3>
              <p className="mx-auto max-w-xs text-xs text-gray-500">
                No records match the current searching filters configuration.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {evaluatedBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { y: 10, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(147, 51, 234, 0.2)",
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 backdrop-blur-xl transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="flex items-center gap-1 text-purple-400">
                      <Layers size={11} />
                      {blog.category}
                    </span>

                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        blog.status === "published"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-base font-bold leading-snug transition-colors group-hover:text-purple-400">
                    {blog.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.03] pt-4">
                  <span className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
                    <Calendar size={11} />
                    {new Date(blog.createdAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </span>

                  <div className="relative z-20 flex items-center gap-1.5">
                    <button className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-gray-400 outline-none transition-colors hover:bg-white/5 hover:text-white">
                      <Edit size={13} />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(blog)}
                      className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-gray-400 outline-none transition-colors hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
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
              className="relative z-10 w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-[#0b0e22] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-3 text-red-400">
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-2">
                  <AlertTriangle size={18} />
                </div>
                <h4 className="font-extrabold tracking-tight">
                  Destructive Purge Pipeline
                </h4>
              </div>

              <p className="text-xs leading-relaxed text-gray-400">
                Confirm elimination of{" "}
                <span className="font-bold text-white">
                  &quot;{deleteTarget.title}&quot;
                </span>
                ? This will systematically delete the database entry and cannot
                be undone.
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  disabled={isDeleting}
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-xl bg-white/5 py-2.5 text-xs font-bold text-gray-300 outline-none transition-all hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  disabled={isDeleting}
                  onClick={handleConfirmedDelete}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)] outline-none transition-all disabled:opacity-50"
                >
                  {isDeleting ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                  <span>Purge Data</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}