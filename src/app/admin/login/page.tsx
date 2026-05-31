"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your admin email and password.");
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
        throw new Error(
          data.error || "Access denied. Please check your login details."
        );
      }

      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FBFF] px-4 py-6 text-slate-900">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.055)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-blue-500/10 blur-[110px]" />
      <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[27%] hidden rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 text-xs font-bold text-blue-600 shadow-[0_18px_55px_rgba(37,99,235,0.10)] backdrop-blur-xl lg:flex"
      >
        Secure Admin Access
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[18%] right-[8%] hidden items-center gap-2 rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 text-xs font-bold text-slate-600 shadow-[0_18px_55px_rgba(37,99,235,0.10)] backdrop-blur-xl lg:flex"
      >
        <Sparkles size={14} className="text-blue-600" />
        CraftODev Panel
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[430px]"
      >
        {/* Branding */}
        <div className="mb-5 flex flex-col items-center text-center">
          <Image
            src="/craftodev-logo.png"
            alt="CraftODev Logo"
            width={210}
            height={60}
            priority
            className="mb-4 h-auto w-auto max-w-[190px]"
          />

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-[0_14px_45px_rgba(37,99,235,0.12)]">
            <ShieldCheck size={22} />
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-600">
            Secure Admin Gateway
          </span>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your CraftODev website content.
          </p>
        </div>

        {/* Login Card */}
        <div className="relative overflow-hidden rounded-[1.7rem] border border-blue-100 bg-white/90 p-5 shadow-[0_22px_75px_rgba(37,99,235,0.12)] backdrop-blur-xl sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_35%)]" />
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                className="relative z-10 mb-4 flex items-start gap-3 overflow-hidden rounded-2xl border border-red-100 bg-red-50 p-3 text-sm text-red-500"
              >
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <p className="font-medium leading-relaxed">{errorMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLoginSubmit} className="relative z-10 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Admin Email
              </label>

              <div className="group/input relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 transition-colors group-focus-within/input:text-blue-600">
                  <Mail size={16} />
                </div>

                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@craftodev.com"
                  className="w-full rounded-2xl border border-blue-100 bg-blue-50/50 py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>

              <div className="group/input relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 transition-colors group-focus-within/input:text-blue-600">
                  <Lock size={16} />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-blue-100 bg-blue-50/50 py-3 pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <button
                  type="button"
                  tabIndex={-1}
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 outline-none transition-colors hover:text-blue-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pb-1">
              <label className="group/check flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-slate-500">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      rememberMe
                        ? "border-blue-600 bg-blue-600"
                        : "border-blue-200 bg-white group-hover/check:border-blue-400"
                    }`}
                  >
                    {rememberMe && (
                      <div className="h-1.5 w-1.5 rounded-sm bg-white" />
                    )}
                  </div>
                </div>

                <span>Keep me signed in</span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={
                isLoading
                  ? {}
                  : {
                      scale: 1.01,
                      boxShadow: "0 18px 38px rgba(37,99,235,0.20)",
                    }
              }
              whileTap={isLoading ? {} : { scale: 0.99 }}
              className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 outline-none transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-blue-100" />
                  <span>Verifying Access...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}