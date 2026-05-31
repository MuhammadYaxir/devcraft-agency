"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Play,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const projectTypes = [
  "Business Website",
  "SaaS Platform",
  "E-Commerce",
  "Portfolio",
  "Dashboard",
  "AI Automation",
];

const budgets = [
  "$500 – $1k",
  "$1k – $3k",
  "$3k – $5k",
  "$5k+",
];

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    text: "Drop us a line anytime.",
    value: "craftodevtech@gmail.com",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    text: "Chat with our team.",
    value: "+92 309 9997547",
  },
  {
    icon: CalendarDays,
    title: "Book a Call",
    text: "Schedule a free strategy call.",
    value: "calendly.com/craftodev",
  },
  {
    icon: MapPin,
    title: "Our Office",
    text: "We work globally.",
    value: "Lahore, Pakistan",
  },
];

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    agree: true,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess("Message sent successfully. I will contact you soon.");

      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
        agree: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f7f8fb] text-black">
      <section className="relative overflow-hidden px-6 pb-16 pt-20">
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 lg:grid-cols-[1fr_560px] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8 flex items-center gap-3 text-xs font-black uppercase tracking-wide">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Let’s Connect
            </div>

            <h1 className="max-w-xl text-5xl font-black uppercase leading-[1.05] tracking-[-0.05em] md:text-7xl">
              Let’s Build Something{" "}
              <span className="text-blue-600">Extraordinary</span> Together.
            </h1>

            <p className="mt-8 max-w-md text-lg leading-8 text-gray-600">
              Have a project in mind or just want to say hello? Fill out the form
              and we’ll get back to you within 24 hours.
            </p>

            <a
              href="https://wa.me/923099997547?text=Hello%20Muhammad%20Yasir%2C%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-4"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <Play className="h-4 w-4 fill-white" />
              </span>
              <span className="border-b border-blue-600 pb-1 text-sm font-black uppercase">
                Schedule a call instead
              </span>
            </a>

            <div className="mt-14">
              <p className="mb-5 text-xs font-black uppercase tracking-wider text-gray-500">
                We respond fast
              </p>

              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  {["Y", "C", "D", "A"].map((item) => (
                    <div
                      key={item}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-xs font-black text-white"
                    >
                      {item}
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white">
                    +
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Average response time</p>
                  <p className="font-black">Under 2 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)] md:p-10"
          >
            <h2 className="mb-8 text-lg font-black uppercase">
              Send us a message
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={updateField}
                  placeholder="Your Name"
                  className="h-14 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  type="email"
                  placeholder="Email Address"
                  className="h-14 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="relative mt-5">
              <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                name="company"
                value={formData.company}
                onChange={updateField}
                placeholder="Company / Organization"
                className="h-14 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs text-gray-600">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={updateField}
                  className="h-14 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none focus:border-blue-600"
                >
                  <option value="">Select a service</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-600">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={updateField}
                  className="h-14 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none focus:border-blue-600"
                >
                  <option value="">Select your budget</option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative mt-5">
              <Pencil className="absolute left-4 top-5 h-4 w-4 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={updateField}
                placeholder="Tell us about your project"
                rows={6}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white p-4 pl-11 text-sm outline-none focus:border-blue-600"
              />
            </div>

            <label className="mt-4 flex items-center gap-3 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={formData.agree}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    agree: e.target.checked,
                  }))
                }
                className="h-5 w-5 accent-blue-600"
              />
              I agree to the <span className="text-blue-600">Privacy Policy</span>
            </label>

            {success && (
              <div className="mt-5 flex items-center gap-3 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                {success}
              </div>
            )}

            {error && (
              <div className="mt-5 flex items-center gap-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !formData.agree}
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Your information is 100% secure and confidential.
            </div>
          </motion.form>
        </div>
      </section>

      <section className="bg-black px-6 py-12 text-white">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-gray-400">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Get in touch
            </div>

            <h2 className="text-4xl font-black leading-tight">
              Other ways <br /> to reach us.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <Icon className="mb-8 h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-black">{card.title}</h3>
                  <p className="mt-3 text-sm text-gray-400">{card.text}</p>
                  <p className="mt-4 text-sm font-bold">{card.value}</p>

                  <button className="mt-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="rounded-xl bg-white p-9 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <div className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600">
              <MapPin className="h-4 w-4" />
              Global Collaboration
            </div>

            <h2 className="text-3xl font-black leading-tight">
              We work with clients from around the world.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              No matter where you are, we’re just a message away.
            </p>

            <div className="mt-7 flex -space-x-3">
              {["U", "K", "A", "P"].map((item) => (
                <div
                  key={item}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black text-xs font-black text-white"
                >
                  {item}
                </div>
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white">
                +
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] rounded-2xl bg-[radial-gradient(circle_at_center,#dbeafe_1px,transparent_1px)] [background-size:18px_18px]">
            {[
              ["Canada", "left-[18%] top-[18%]"],
              ["USA", "left-[20%] top-[38%]"],
              ["UK", "left-[50%] top-[20%]"],
              ["UAE", "left-[62%] top-[48%]"],
              ["Pakistan", "left-[70%] top-[36%]"],
              ["Singapore", "left-[82%] top-[58%]"],
              ["Australia", "left-[84%] top-[76%]"],
            ].map(([country, position]) => (
              <div
                key={country}
                className={`absolute ${position} flex items-center gap-2`}
              >
                <span className="h-4 w-4 rounded-full bg-blue-600 shadow-[0_0_0_6px_rgba(37,99,235,0.12)]" />
                <span className="rounded-md bg-white px-3 py-2 text-xs font-bold shadow">
                  {country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-14 text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Ready to start?
            </div>

            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              Let’s turn your idea into a powerful digital experience.
            </h2>
          </div>

          <a
            href="https://wa.me/923099997547?text=Hello%20Muhammad%20Yasir%2C%20I%20want%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-10 py-5 text-sm font-black uppercase text-white transition hover:bg-blue-700"
          >
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}