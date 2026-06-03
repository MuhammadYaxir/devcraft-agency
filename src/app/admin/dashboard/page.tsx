"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  LogOut,
  PlusCircle,
  TrendingUp,
  FolderGit2,
  BookOpen,
  Edit3,
  Menu,
  X,
  Bell,
  ArrowUpRight,
  ShieldAlert,
  Loader2,
  Sparkles,
} from "lucide-react";

const sidebarVariants: Variants = {
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.4 } },
};

type AdminUser = {
  email: string;
  role: string;
};

type DashboardStats = {
  totalBlogs: number;
  totalProjects: number;
  publishedBlogs: number;
  draftBlogs: number;
};

type ContentItem = {
  status?: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalProjects: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [blogsResponse, projectsResponse] = await Promise.all([
          fetch("/api/blogs", { method: "GET" }),
          fetch("/api/projects", { method: "GET" }),
        ]);

        const blogsData = await blogsResponse.json();
        const projectsData = await projectsResponse.json();

        const blogs: ContentItem[] = Array.isArray(blogsData?.data)
          ? blogsData.data
          : [];

        const projects: ContentItem[] = Array.isArray(projectsData?.data)
          ? projectsData.data
          : [];

        setDashboardStats({
          totalBlogs: blogs.length,
          totalProjects: projects.length,
          publishedBlogs: blogs.filter(
            (blog) => blog.status?.toLowerCase() === "published"
          ).length,
          draftBlogs: blogs.filter(
            (blog) => blog.status?.toLowerCase() === "draft"
          ).length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    const verifySessionIdentity = async () => {
      try {
        const response = await fetch("/api/admin/me", { method: "GET" });
        const data = await response.json();

        if (!response.ok || !data.authorized) {
          throw new Error("Unauthorized access token context.");
        }

        setAdminUser(data.user);
        setIsAuthorized(true);
        await fetchDashboardStats();
      } catch {
        setIsAuthorized(false);
        router.push("/admin/login");
      }
    };

    verifySessionIdentity();
  }, [router]);

  const handleSystemLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) router.push("/admin/login");
    } catch (err) {
      console.error("Logout pipeline interrupt exception:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isAuthorized === null || !isAuthorized) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-[#F8FBFF] text-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:52px_52px]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="relative z-10 rounded-full border border-blue-100 bg-white p-3 text-blue-600 shadow-[0_20px_60px_rgba(37,99,235,0.15)]"
        >
          <Loader2 size={24} className="animate-spin" />
        </motion.div>

        <p className="relative z-10 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 animate-pulse">
          Verifying Secure Admin Access...
        </p>
      </div>
    );
  }

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Blogs", icon: FileText },
    { name: "Projects", icon: Briefcase },
    { name: "Settings", icon: Settings },
  ];

  const statCards = [
    {
      title: "Total Blogs",
      value: dashboardStats.totalBlogs.toString(),
      desc: "All blog articles",
      icon: BookOpen,
    },
    {
      title: "Projects",
      value: dashboardStats.totalProjects.toString(),
      desc: "Portfolio projects",
      icon: FolderGit2,
    },
    {
      title: "Published",
      value: dashboardStats.publishedBlogs.toString(),
      desc: "Live blog posts",
      icon: FileText,
    },
    {
      title: "Drafts",
      value: dashboardStats.draftBlogs.toString(),
      desc: "Unpublished drafts",
      icon: Edit3,
    },
  ];

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#F8FBFF] text-slate-900 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Desktop Sidebar */}
      <aside className="relative z-20 hidden w-[245px] shrink-0 flex-col border-r border-blue-100 bg-white/80 px-5 py-6 shadow-[16px_0_60px_rgba(37,99,235,0.05)] backdrop-blur-2xl lg:flex">
        <div className="mb-8 px-1">
          <Image
  src="/craftodev-logo.webp"
  alt="CraftODev Logo"
  width={155}
  height={45}
  priority
  className="w-auto h-auto max-w-[155px] object-contain"
/>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`group relative flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold outline-none transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon size={17} />
                <span>{item.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute right-3 h-2 w-2 rounded-full bg-white"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-3">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <Sparkles size={15} />
          </div>
          <p className="text-xs font-bold text-slate-900">CraftODev Admin</p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            Manage website content fast.
          </p>
        </div>

        <button
          onClick={handleSystemLogout}
          disabled={isLoggingOut}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-500 outline-none hover:bg-red-100 disabled:opacity-50"
        >
          {isLoggingOut ? <Loader2 size={17} className="animate-spin" /> : <LogOut size={17} />}
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-blue-100 bg-white p-5 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
               <Image
  src="/craftodev-logo.webp"
  alt="CraftODev Logo"
  width={140}
  height={42}
  priority
  className="w-auto h-auto max-w-[120px] sm:max-w-[140px] object-contain"
/>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl border border-blue-100 bg-blue-50 p-2 text-blue-600 outline-none"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold outline-none ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <Icon size={17} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={handleSystemLogout}
                disabled={isLoggingOut}
                className="mt-4 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-500 outline-none disabled:opacity-50"
              >
                {isLoggingOut ? <Loader2 size={17} className="animate-spin" /> : <LogOut size={17} />}
                <span>Logout</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-blue-100 bg-white/80 px-5 shadow-sm backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-xl border border-blue-100 bg-blue-50 p-2 text-blue-600 outline-none hover:bg-blue-100 lg:hidden"
            >
              <Menu size={18} />
            </button>

            <h2 className="hidden text-xs font-black uppercase tracking-[0.22em] text-slate-500 sm:block">
              Admin Panel / <span className="text-blue-600">{activeTab}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="group relative rounded-xl border border-blue-100 bg-blue-50 p-2 text-blue-600 outline-none hover:bg-blue-100">
              <Bell size={17} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400 ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-3 py-1.5 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-[11px] font-black text-white">
                AD
              </div>

              <div className="hidden md:block">
                <p className="max-w-[150px] truncate text-xs font-bold text-slate-700">
                  {adminUser?.email}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                  {adminUser?.role || "Admin"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="h-[calc(100vh-4rem)] overflow-y-auto p-5 sm:p-7">
          <div className="mx-auto max-w-6xl space-y-5">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[1.6rem] border border-blue-100 bg-white/85 p-5 shadow-[0_18px_55px_rgba(37,99,235,0.07)] backdrop-blur-xl sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_35%)]" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-blue-600">
                  <TrendingUp size={13} />
                  System Interface Active
                </span>

                <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  Welcome back, Yasir.
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Manage CraftODev blogs, portfolio projects, and website content
                  from a clean admin dashboard.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-4 xl:grid-cols-4"
            >
              {statCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.title}
                    variants={itemVariants}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 18px 50px rgba(37,99,235,0.10)",
                    }}
                    className="group relative flex items-start justify-between overflow-hidden rounded-[1.35rem] border border-blue-100 bg-white/85 p-4 shadow-[0_14px_45px_rgba(37,99,235,0.05)] backdrop-blur-xl"
                  >
                    <div className="relative z-10">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        {card.title}
                      </span>

                      <h3 className="mt-2 text-3xl font-black leading-none tracking-tight text-slate-950 group-hover:text-blue-600">
                        {card.value}
                      </h3>

                      <p className="mt-2 text-[11px] font-medium text-slate-500">
                        {card.desc}
                      </p>
                    </div>

                    <div className="relative z-10 rounded-2xl border border-blue-100 bg-blue-50 p-2.5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={17} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
                className="flex flex-col rounded-[1.5rem] border border-blue-100 bg-white/85 p-5 shadow-[0_18px_55px_rgba(37,99,235,0.06)] backdrop-blur-xl lg:col-span-2"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-950">
                      Recent Website Activity
                    </h3>

                    <p className="text-xs text-slate-500">
                      Latest content actions from dashboard
                    </p>
                  </div>

                  <button className="flex items-center gap-1 text-xs font-bold text-blue-600 outline-none hover:text-blue-700">
                    <span>View All</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      text: "New case study added to CraftODev portfolio",
                      time: "2 hours ago",
                      author: "YasirTech",
                      category: "Project",
                    },
                    {
                      text: "Published blog article about Next.js development",
                      time: "1 day ago",
                      author: "System Hook",
                      category: "Blog",
                    },
                    {
                      text: "Draft created for upcoming SaaS project showcase",
                      time: "3 days ago",
                      author: "YasirTech",
                      category: "Draft",
                    },
                  ].map((act, idx) => (
                    <div
                      key={idx}
                      className="group flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/40 p-3 transition-all hover:bg-white hover:shadow-sm"
                    >
                      <div
                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                          act.category === "Project"
                            ? "bg-emerald-400"
                            : act.category === "Blog"
                            ? "bg-blue-500"
                            : "bg-amber-400"
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-700 group-hover:text-slate-950">
                          {act.text}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                          <span>{act.time}</span>
                          <span>•</span>
                          <span className="font-bold text-blue-600">
                            {act.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
                className="flex flex-col rounded-[1.5rem] border border-blue-100 bg-white/85 p-5 shadow-[0_18px_55px_rgba(37,99,235,0.06)] backdrop-blur-xl"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-black tracking-tight text-slate-950">
                    Quick Actions
                  </h3>

                  <p className="text-xs text-slate-500">
                    Create and manage content fast
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={() => router.push("/admin/blogs/create")}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 outline-none hover:bg-blue-700"
                  >
                    <PlusCircle
                      size={15}
                      className="transition-transform group-hover:rotate-90"
                    />
                    <span>Create New Blog</span>
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/admin/projects/create")}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-bold text-blue-700 outline-none hover:bg-blue-100"
                  >
                    <PlusCircle size={15} />
                    <span>Create New Project</span>
                  </motion.button>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-3 text-[11px] leading-relaxed text-slate-500">
                  <ShieldAlert
                    size={15}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p>
                    Admin actions are protected by your secure session and
                    connected to your website database.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}