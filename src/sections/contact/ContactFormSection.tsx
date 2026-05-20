"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const budgets = [
  "$5k – $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
];

const projectTypes = [
  "Business Website",
  "SaaS Platform",
  "E-Commerce",
  "Portfolio",
  "Dashboard",
  "AI Product",
];

const timelines = [
  "ASAP",
  "1 Month",
  "2-3 Months",
  "Flexible",
];

export default function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          company,
          projectType,
          timeline,
          budget,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(
        "Message sent successfully. I will contact you soon."
      );

      setName("");
      setEmail("");
      setCompany("");
      setProjectType("");
      setTimeline("");
      setBudget("");
      setMessage("");

    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send message.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#050816] text-white px-6 py-28 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[11px] font-bold uppercase tracking-[0.6em] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-6 py-3 rounded-full"
          >
            Get In Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mt-10 leading-tight"
          >
            Let&apos;s craft something <br />
            legendary
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-2xl max-w-4xl mx-auto mt-8 leading-relaxed"
          >
            Have a disruptive product idea or enterprise system framework?
            Reach out and our core development team will chart your architectural pipeline.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-xl"
        >

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

            <div>
              <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Your Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full h-16 rounded-2xl bg-white/[0.03] border border-white/10 px-6 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Email Address
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john@example.com"
                className="w-full h-16 rounded-2xl bg-white/[0.03] border border-white/10 px-6 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 transition"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

            <div>
              <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Company Name
              </label>

              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                placeholder="Your Company"
                className="w-full h-16 rounded-2xl bg-white/[0.03] border border-white/10 px-6 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Project Type
              </label>

              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full h-16 rounded-2xl bg-[#0b1020] border border-white/10 px-6 text-white outline-none focus:border-purple-500/60 transition"
              >
                <option value="">Select Project Type</option>

                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            <div>
              <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Expected Timeline
              </label>

              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full h-16 rounded-2xl bg-[#0b1020] border border-white/10 px-6 text-white outline-none focus:border-purple-500/60 transition"
              >
                <option value="">Select Timeline</option>

                {timelines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Budget Range
              </label>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-16 rounded-2xl bg-[#0b1020] border border-white/10 px-6 text-white outline-none focus:border-purple-500/60 transition"
              >
                <option value="">Select Budget</option>

                {budgets.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mb-10">
            <label className="block text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Project Brief / Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project..."
              rows={7}
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 text-white placeholder:text-gray-600 outline-none focus:border-purple-500/60 resize-none transition"
            />
          </div>

          {/* Success */}
          {success && (
            <div className="mb-6 flex items-center gap-3 text-green-400 text-sm">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* WhatsApp */}
            <a
              href="https://wa.me/923099997547?text=Hello%20Muhammad%20Yasir%2C%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <button
                type="button"
                className="w-full md:w-auto px-8 py-5 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.35)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <FaWhatsapp size={24} />
                Contact on WhatsApp
              </button>
            </a>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Transmitting..." : "Transmit Message"}
              <Send size={18} />
            </button>

          </div>
        </motion.form>
      </div>
    </section>
  );
}