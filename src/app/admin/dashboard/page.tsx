"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  User,
  Menu,
  X,
  Bell,
  ArrowUpRight,
  ShieldAlert,
  Loader2
} from "lucide-react";

// --- Layout Animation Variations Configuration ---
const sidebarVariants = {
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 } }
};

export default function AdminDashboardPage() {
  const router = useRouter();

  // --- State Architecture Management ---
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  // --- Auth Verification Hydration Hook ---
  useEffect(() => {
    const verifySessionIdentity = async () => {
      try {
        const response = await fetch("/api/admin/me", { method: "GET" });
        const data = await response.json();

        if (!response.ok || !data.authorized) {
          throw new Error("Unauthorized access token context.");
        }

        setAdminUser(data.user);
        setIsAuthorized(true);
      } catch (err) {
        setIsAuthorized(false);
        router.push("/admin/login");
      }
    };

    verifySessionIdentity();
  }, [router]);

  // --- Session Termination Dispatch Handler ---
  const handleSystemLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        router.push("/admin/login");
      }
    } catch (err) {
      console.error("Logout pipeline interrupt exception:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Guard Clause: Prevent layout flashing during identity evaluation
  if (isAuthorized === null || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center gap-4 text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.2)]"
        >
          <Loader2 size={28} className="animate-spin" />
        </motion.div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold animate-pulse">
          Synchronizing Security Layer Matrix...
        </p>
      </div>
    );
  }

  // Navigation Items Vector Array
  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Blogs", icon: FileText },
    { name: "Projects", icon: Briefcase },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden font-sans select-none relative">
      
      {/* Cinematic Static Lighting Arrays */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/[0.02] blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-indigo-600/[0.015] blur-[130px] rounded-full pointer-events-none z-0" />

      {/* ========================================================= */}
      {/* 1. SIDEBAR NAVIGATION CONTROLLERS FRAMEWORK              */}
      {/* ========================================================= */}
      
      {/* Desktop Persistent Sidebar Chassis */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/[0.01] border-r border-white/[0.04] p-6 backdrop-blur-2xl z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
            <TrendingUp size={16} />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
            DevCraft Panel
          </span>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group outline-none ${
                  isActive 
                    ? "text-purple-400 bg-purple-500/[0.06] border border-purple-500/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon size={18} className={isActive ? "text-purple-400" : "text-gray-400 group-hover:text-purple-300 transition-colors"} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div layoutId="activeTabIndicator" className="absolute left-0 w-[3px] h-5 bg-purple-500 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleSystemLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3.5 px-4 py-3 text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.04] rounded-xl border border-transparent hover:border-red-500/10 transition-all duration-300 outline-none disabled:opacity-50"
        >
          {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
          <span>Disconnect Panel</span>
        </button>
      </aside>

      {/* Mobile Popout Floating Sidebar Container */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 w-64 bg-[#060919] border-r border-white/[0.06] p-6 z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-extrabold tracking-tight text-white">DevCraft Base</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 outline-none"
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
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium outline-none ${
                        isActive ? "text-purple-400 bg-purple-500/[0.05] border border-purple-500/10" : "text-gray-400"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={handleSystemLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3.5 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/[0.03] rounded-xl outline-none"
              >
                <LogOut size={18} />
                <span>Disconnect Panel</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 2. MAIN HUB VISUAL AREA EXECUTION ARRAYS                 */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
        
        {/* Top Header Floating Navigation Bar */}
        <header className="h-20 border-b border-white/[0.04] px-6 sm:px-10 flex items-center justify-between bg-[#050816]/30 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white lg:hidden transition-all outline-none"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 hidden sm:block">
              Core Console / <span className="text-purple-400 font-extrabold">{activeTab}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 hover:text-purple-400 transition-all outline-none relative group">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-purple-500 rounded-full ring-2 ring-[#050816] group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="h-8 w-[1px] bg-white/[0.05]" />

            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-3.5 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[11px] font-black">
                AD
              </div>
              <span className="text-xs font-semibold text-gray-300 hidden md:block max-w-[120px] truncate">
                {adminUser?.email}
              </span>
            </div>
          </div>
        </header>

        {/* Core Main View Panel Chassis */}
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Welcome Dashboard Hub Section Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-r from-purple-900/10 via-indigo-900/5 to-transparent border border-purple-500/10 rounded-2xl p-6 sm:p-8 overflow-hidden backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] group"
          >
            <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-purple-500/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-purple-400">
                System Interface Active
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, Agent Hub.
              </h1>
              <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
                Your creative ecosystem pipeline is fully functioning. Track live database nodes, compile new content modules, or review agency incoming transaction footprints.
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* 3. GRID METRICS DISPLAY MODULES ARRAY                    */}
          {/* ========================================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { title: "Total Blogs", value: "32", desc: "+4 added this month", icon: BookOpen },
              { title: "Total Projects", value: "18", desc: "6 active production pipelines", icon: FolderGit2 },
              { title: "Published Posts", value: "27", desc: "Live on core static client domains", icon: FileText },
              { title: "Draft Posts", value: "5", desc: "Awaiting administrative review hooks", icon: Edit3 },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: "rgba(147, 51, 234, 0.25)", boxShadow: "0 10px 30px -10px rgba(147,51,234,0.15)" }}
                  className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 backdrop-blur-xl transition-colors duration-300 flex items-start justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3.5 relative z-10">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{card.title}</span>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black tracking-tight group-hover:text-purple-400 transition-colors">
                        {card.value}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium">{card.desc}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white/[0.02] group-hover:bg-purple-500/10 border border-white/5 group-hover:border-purple-500/20 rounded-xl text-gray-400 group-hover:text-purple-400 transition-all duration-300 shadow-inner">
                    <Icon size={18} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ========================================================= */}
          {/* 4. SPLIT PANEL VIEW: RECENT ACTIVITIES & ACTIONS          */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Live Interaction Activity Streams */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 bg-white/[0.01] border border-white/[0.04] rounded-2xl p-6 backdrop-blur-xl flex flex-col space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight">Recent Ecosystem Events</h3>
                  <p className="text-xs text-gray-500">Live configuration actions tracked on cloud datastores</p>
                </div>
                <button className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors outline-none">
                  <span>View All logs</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="flex-1 space-y-4">
                {[
                  { text: "New case study added to DevCraft portfolio matrix", time: "2 hours ago", author: "YasirTech", category: "Project" },
                  { text: "Published blog architecture node regarding Next.js 15 frameworks", time: "1 day ago", author: "System Hook", category: "Blog" },
                  { text: "Draft layout assembled for pending luxury SaaS project mockup", time: "3 days ago", author: "YasirTech", category: "Draft" },
                ].map((act, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 bg-white/[0.01] border border-white/5 hover:border-purple-500/10 rounded-xl transition-all group">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      act.category === "Project" ? "bg-emerald-400" : act.category === "Blog" ? "bg-purple-400" : "bg-amber-400"
                    }`} />
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors truncate">{act.text}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span>{act.time}</span>
                        <span>•</span>
                        <span className="text-purple-400/80 font-semibold">{act.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Action Controls Hub Terminal Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-6 backdrop-blur-xl flex flex-col space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight">Quick Action Consoles</h3>
                <p className="text-xs text-gray-500">Initialize compilation macros instantly</p>
              </div>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.01, x: 2, boxShadow: "0 0 15px rgba(168,85,247,0.15)" }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(147,51,234,0.15)] outline-none group"
                >
                  <PlusCircle size={15} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span>Compile New Blog Node</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-purple-500/20 text-gray-300 hover:text-white font-semibold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all outline-none"
                >
                  <PlusCircle size={15} />
                  <span>Initialize New Project Brief</span>
                </motion.button>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center gap-3 text-gray-500 text-[11px] leading-relaxed">
                <ShieldAlert size={14} className="text-purple-400/60 flex-shrink-0" />
                <p>All core write transactions executed from this cockpit are cryptographic bound to your identity signature trace.</p>
              </div>
            </motion.div>

          </div>

        </main>
      </div>
    </div>
  );
}