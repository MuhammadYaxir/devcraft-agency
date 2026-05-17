"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";

// Existing Component Hooks
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import PrimaryButton from "@/components/ui/PrimaryButton";

// 1. Zod Validation Engine Schema matching Route Handler specifications
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  budget: z.string().min(1, { message: "Please select a project budget bracket." }),
  message: z.string().min(10, { message: "Message must contain at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetBrackets = [
  "$5k – $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
];

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      budget: "",
      message: "",
    },
  });

  const selectedBudget = watch("budget");

  // 2. Async Submit Handler Processing API Loop
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSubmitStatus("success");
      setServerMessage(result.message);
      reset(); // Clear input fields on success
    } catch (error: any) {
      setSubmitStatus("error");
      setServerMessage(error.message || "Failed to transmit inquiry data layer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (<>
    <Navbar/>
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-[#050816]">
      {/* Absolute Atmospheric Glow Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        {/* Modular Section Title Stack */}
        <SectionHeading
          badge="Get In Touch"
          title="Let's craft something legendary"
          description="Have a disruptive product idea or enterprise system framework? Reach out and our core development team will chart your architectural pipeline."
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <GlowCard className="p-6 md:p-12 bg-white/[0.01] border-white/5 backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              {submitStatus !== "success" ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 md:space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Row 1: Name and Email Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register("name")}
                        className={`w-full px-5 py-4 bg-white/[0.02] border ${
                          errors.name ? "border-red-500/40 focus:border-red-500" : "border-white/10 focus:border-purple-500/50"
                        } rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.15)]`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={`w-full px-5 py-4 bg-white/[0.02] border ${
                          errors.email ? "border-red-500/40 focus:border-red-500" : "border-white/10 focus:border-purple-500/50"
                        } rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.15)]`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Budget Selector Grid */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      Project Budget Bracket
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {budgetBrackets.map((bracket) => {
                        const isSelected = selectedBudget === bracket;
                        return (
                          <button
                            key={bracket}
                            type="button"
                            onClick={() => setValue("budget", bracket, { shouldValidate: true })}
                            className={`px-4 py-3.5 text-xs font-medium rounded-xl border text-center transition-all duration-300 ${
                              isSelected
                                ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.2)]"
                                : "bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/[0.04] hover:border-white/20"
                            }`}
                          >
                            {bracket}
                          </button>
                        );
                      })}
                    </div>
                    {errors.budget && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.budget.message}</p>
                    )}
                  </div>

                  {/* Row 3: Project Description Text Area */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      Project Brief / Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your product specs, technical goals, and timeline parameters..."
                      {...register("message")}
                      className={`w-full px-5 py-4 bg-white/[0.02] border ${
                        errors.message ? "border-red-500/40 focus:border-red-500" : "border-white/10 focus:border-purple-500/50"
                      } rounded-xl text-white placeholder-gray-600 text-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.15)] resize-none`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.message.message}</p>
                    )}
                  </div>

                  {/* Submission Row & Error Notifications */}
                  <div className="pt-2 flex flex-col gap-4">
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        <AlertCircle size={18} className="flex-shrink-0" />
                        <span>{serverMessage}</span>
                      </motion.div>
                    )}

                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto sm:self-end"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={14} />
                        </>
                      )}
                    </PrimaryButton>
                  </div>
                </motion.form>
              ) : (
                /* Success Screen Materialized Context Banner */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="flex flex-col items-center text-center py-8 space-y-4"
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Transmission Complete</h3>
                  <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                    {serverMessage || "Your project parameters have successfully integrated into our network stream. Our core engineering branch will review the brief and contact you within 24 business hours."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus("idle")}
                    className="text-xs text-purple-400 font-semibold uppercase tracking-wider hover:text-purple-300 pt-4 underline underline-offset-4 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </GlowCard>
        </div>
      </Container>
    </section>
    </>
  );
}