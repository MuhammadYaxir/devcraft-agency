"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  // Core Form Processing States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Form Submission Pipeline Handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Basic frontend structure validation check
    if (!email.trim() || !password) {
      setErrorMessage("Please fill in all requested terminal credentials.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Access denied. Verification mismatch.");
      }

      // Successful routing dispatch pipeline
      router.push("/admin/dashboard");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected system routing error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* 1. Cinematic Background Glowing Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/[0.04] blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      {/* Subtle matrix-like grid accent line overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 2. Concentrated Main Wrapper Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        {/* Top Floating Branding Accent */}
        <div className="flex flex-col items-center mb-8 text-center space-y-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2 shadow-[0_0_20px_rgba(147,51,234,0.15)]"
          >
            <ShieldCheck size={24} />
          </motion.div>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400/80">
            Secure Gateway Protocols
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            DevCraft <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">HQ Control</span>
          </h1>
        </div>

        {/* Premium Dark Glassmorphism Container Chassis */}
        <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          {/* Subtle perimeter glow vector animation */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          {/* Animated Error Notifications Segment Block */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 text-red-400 text-sm overflow-hidden"
              >
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <p className="font-medium leading-relaxed">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Action Submit Node Block Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            
            {/* Input Element 1: Email Input Container */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Administrative Identifier
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-purple-400 transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@devcraft.agency"
                  className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Input Element 2: Password Input Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Verification Passcode
                </label>
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-purple-400 transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#080b1e]/60 border border-white/5 rounded-xl py-3 pl-11 pr-12 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-purple-400 transition-colors outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Option Control Toggles */}
            <div className="flex items-center justify-between pt-1 pb-2">
              <label className="flex items-center gap-2.5 text-xs text-gray-400 font-medium cursor-pointer group/check">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${rememberMe ? "bg-purple-500/20 border-purple-500" : "border-white/10 bg-[#080b1e]/60 group-hover/check:border-purple-500/40"}`}>
                    {rememberMe && <div className="w-1.5 h-1.5 rounded-sm bg-purple-400" />}
                  </div>
                </div>
                <span>Keep console verified</span>
              </label>
            </div>

            {/* Action Element 3: Hardware Accelerated Submit Pulse Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={isLoading ? {} : { scale: 1.01, boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)" }}
              whileTap={isLoading ? {} : { scale: 0.99 }}
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group/btn shadow-[0_4px_12px_rgba(147,51,234,0.2)]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-purple-200" />
                  <span>Validating Credentials...</span>
                </>
              ) : (
                <>
                  <span>Initialize Connection Matrix</span>
                  <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}