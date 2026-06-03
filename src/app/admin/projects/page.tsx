"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Calendar,
  Layers,
  Loader2,
  AlertTriangle,
  FolderOpen,
  Star,
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

interface ProjectsApiResponse {
  success: boolean;
  data?: ProjectItem[];
  error?: string;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "A network breakdown disrupted datastore synchronization.";
}

export default function ProjectManagementPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchProjectCollection = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const response = await fetch("/api/projects", { method: "GET" });
      const json = (await response.json()) as ProjectsApiResponse;

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to aggregate system pipeline indexes."
        );
      }

      setProjects(json.data || []);
    } catch (err: unknown) {
      console.error("Aggregation pipeline processing failure:", err);
      setFetchError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchProjectCollection();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleConfirmedDelete = async () => {
    if (!deleteTarget) return;

    const targetId = deleteTarget._id;
    setIsDeleting(true);

    const fallbackBackupState = [...projects];

    try {
      setProjects((prev) => prev.filter((item) => item._id !== targetId));
      setDeleteTarget(null);

      const response = await fetch(`/api/projects/${targetId}`, {
        method: "DELETE",
      });

      const json = (await response.json()) as ProjectsApiResponse;

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Server transaction rejection.");
      }
    } catch (err: unknown) {
      console.error(
        "Purge matrix pipeline crash. Restoring memory map states:",
        err
      );

      alert(`Purge Interrupted: ${getErrorMessage(err)}`);
      setProjects(fallbackBackupState);
    } finally {
      setIsDeleting(false);
    }
  };

  const processedProjects = projects.filter((project) => {
    const normalizedQuery = searchQuery.toLowerCase();

    const evaluatesSearch =
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.category.toLowerCase().includes(normalizedQuery);

    const evaluatesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return evaluatesSearch && evaluatesStatus;
  });

  return (
    <div className="relative min-h-screen select-none overflow-hidden bg-[#050816] p-6 font-sans text-white sm:p-10">
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-purple-600/[0.03] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.02] blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.04] pb-6 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Portfolio{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Console
              </span>
            </h1>
            <p className="text-xs font-medium text-gray-400">
              Manage showcase properties, case studies, and code architecture
              deployments.
            </p>
          </div>

          <Link href="/admin/projects/create">
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
              <span>Register New Project</span>
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
              placeholder="Search concepts dynamically by mapping matching title or taxonomy properties..."
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
              <option value="all">Display All Portfolio Items</option>
              <option value="published">Status: Live Distributions</option>
              <option value="draft">Status: Sandbox System Drafts</option>
            </select>
          </div>
        </div>

        {fetchError && (
          <div className="flex animate-pulse items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-400">
            <AlertTriangle size={14} />
            <span>{fetchError}</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((sIndex) => (
              <div
                key={sIndex}
                className="h-48 animate-pulse space-y-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] p-5"
              >
                <div className="h-4 w-1/4 rounded bg-white/5" />
                <div className="h-6 w-5/6 rounded bg-white/5" />
                <div className="h-10 w-full rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : processedProjects.length === 0 ? (
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
                No Portfolio Nodes Manifested
              </h3>
              <p className="mx-auto max-w-xs text-xs text-gray-500">
                No matching entries are registered into this view layout
                boundary.
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
            {processedProjects.map((project) => (
              <motion.div
                key={project._id}
                variants={{
                  hidden: { y: 10, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(147, 51, 234, 0.25)",
                }}
                className="group relative flex h-52 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] p-5 backdrop-blur-xl transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="flex items-center gap-1 text-purple-400">
                      <Layers size={11} />
                      {project.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <span
                          className="rounded border border-purple-500/30 bg-purple-500/10 p-1 text-purple-400"
                          title="Featured Display Case"
                        >
                          <Star size={10} fill="currentColor" />
                        </span>
                      )}

                      <span
                        className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          project.status === "published"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="line-clamp-2 text-base font-bold leading-snug transition-colors group-hover:text-purple-400">
                    {project.title}
                  </h3>

                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.03] pt-4">
                  <span className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
                    <Calendar size={11} />
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </span>

                  <div className="relative z-20 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/admin/projects/edit/${project._id}`)
                      }
                      className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-gray-400 outline-none transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Edit size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(project)}
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
                  Purge Portfolio Asset
                </h4>
              </div>

              <p className="text-xs leading-relaxed text-gray-400">
                Confirm elimination of{" "}
                <span className="font-bold text-white">
                  &quot;{deleteTarget.title}&quot;
                </span>
                ? This systematically wipes historical write streams and metrics
                from system nodes.
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-xl bg-white/5 py-2.5 text-xs font-bold text-gray-300 outline-none transition-all hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleConfirmedDelete}
                  className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)] outline-none transition-all disabled:opacity-50"
                >
                  {isDeleting ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}

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