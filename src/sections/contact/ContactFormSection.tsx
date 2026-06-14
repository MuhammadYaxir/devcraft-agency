"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowRight,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  User,
  Building2,
  Pencil,
  Lock,
  Globe2,
  Plus,
} from "lucide-react";

const calendlyLink = "https://calendly.com/craftodevtech/30min";

const contactCards = [
  {
    title: "Email Us",
    desc: "Drop us a line anytime.",
    value: "craftodevtech@gmail.com",
    icon: Mail,
    href: "mailto:craftodevtech@gmail.com",
  },
  {
    title: "WhatsApp",
    desc: "Chat with our team.",
    value: "+92 309 9997547",
    icon: Phone,
    href: "https://wa.me/923099997547",
  },
  {
    title: "Book a Call",
    desc: "Schedule a free strategy call.",
    value: "30 Minute Discovery Call",
    icon: CalendarDays,
    href: calendlyLink,
  },
  {
    title: "Our Office",
    desc: "We work globally.",
    value: "Lahore, Pakistan",
    icon: MapPin,
    href: "#",
  },
];

const locations = [
  { name: "Canada", className: "left-[24%] top-[22%]" },
  { name: "USA", className: "left-[20%] top-[42%]" },
  { name: "UK", className: "left-[50%] top-[22%]" },
  { name: "Pakistan", className: "left-[65%] top-[38%]" },
  { name: "UAE", className: "left-[58%] top-[50%]" },
  { name: "Singapore", className: "left-[82%] top-[52%]" },
  { name: "Australia", className: "left-[85%] top-[74%]" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    agree: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agree) {
      setStatusMessage("Please agree to the privacy policy.");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatusMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatusMessage("Message sent successfully. We will contact you soon.");

      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
        agree: true,
      });
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-white text-[#05070D]">
        <section className="relative overflow-hidden bg-[#F7FBFF] pt-[86px]">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAF6FF]" />
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_43%_45%,rgba(20,99,255,0.1),transparent_24%)]" />
          <div className="absolute bottom-0 left-[35%] h-[300px] w-[480px] rounded-full bg-[#1463FF]/10 blur-[90px]" />

          <div className="relative z-10 mx-auto grid min-h-[560px] max-w-[1500px] grid-cols-1 gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div className="flex flex-col justify-center">
              <h1 className="max-w-[680px] text-[42px] font-black uppercase leading-[0.94] tracking-[-0.06em] sm:text-[62px] lg:text-[72px] xl:text-[82px]">
                Let&apos;s Build <br />
                Something <br />
                <span className="bg-gradient-to-r from-[#1463FF] to-[#05C8F7] bg-clip-text text-transparent">
                  Extraordinary
                </span>{" "}
                <br />
                Together.
              </h1>

              <p className="mt-6 max-w-md text-base font-medium leading-8 text-[#4B5563]">
                Have a project in mind or just want to say hello? Fill out the
                form and we&apos;ll get back to you within 24 hours.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="https://wa.me/923099997547"
                  target="_blank"
                  className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#25D366]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)]">
                    <FaWhatsapp size={22} />
                  </span>
                  WhatsApp Us
                </Link>

                <Link
                  href={calendlyLink}
                  target="_blank"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#1463FF]/15 bg-white px-6 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#1463FF] shadow-sm transition-all hover:border-[#1463FF] hover:bg-[#1463FF] hover:text-white"
                >
                  <CalendarDays size={16} />
                  Book Free 30 Min Call
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-10">
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#1463FF]">
                  We Respond Fast
                </p>

                <div className="flex items-center gap-5">
                  <div className="flex -space-x-3">
                    <Image
                      src="/muhammad-yasir-founder-ceo.webp"
                      alt="Team member"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border-2 border-white object-cover"
                    />
                    <Image
                      src="/yaseen.webp"
                      alt="Team member"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border-2 border-white object-cover"
                    />
                    <Image
                      src="/shair-afgun.webp"
                      alt="Team member"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border-2 border-white object-cover"
                    />
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#1463FF] text-white">
                      <Plus size={18} />
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-[#4B5563]">
                      Average response time
                    </p>
                    <p className="text-lg font-black">Under 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center lg:justify-end">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[560px] rounded-[24px] bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:p-8"
              >
                <h2 className="mb-6 text-2xl font-black uppercase tracking-[-0.04em]">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="relative">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8794]"
                    />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="h-12 w-full rounded-lg border border-[#D9E3F0] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#1463FF]"
                    />
                  </label>

                  <label className="relative">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8794]"
                    />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className="h-12 w-full rounded-lg border border-[#D9E3F0] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#1463FF]"
                    />
                  </label>

                  <label className="relative sm:col-span-2">
                    <Building2
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8794]"
                    />
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company / Organization"
                      className="h-12 w-full rounded-lg border border-[#D9E3F0] bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#1463FF]"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-medium text-[#4B5563]">
                      Project Type
                    </span>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-lg border border-[#D9E3F0] bg-white px-4 text-sm outline-none transition focus:border-[#1463FF]"
                    >
                      <option value="">Select a service</option>
                      <option value="Business Website">Business Website</option>
                      <option value="SaaS Development">SaaS Development</option>
                      <option value="E-Commerce Store">E-Commerce Store</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="AI Chatbot">AI Chatbot</option>
                      <option value="Dashboard">Dashboard</option>
                    </select>
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-medium text-[#4B5563]">
                      Budget Range
                    </span>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-lg border border-[#D9E3F0] bg-white px-4 text-sm outline-none transition focus:border-[#1463FF]"
                    >
                      <option value="">Select your budget</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </label>

                  <label className="relative sm:col-span-2">
                    <Pencil
                      size={17}
                      className="absolute left-4 top-4 text-[#7B8794]"
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project"
                      rows={4}
                      className="w-full resize-none rounded-lg border border-[#D9E3F0] bg-white py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#1463FF]"
                    />
                  </label>
                </div>

                <label className="mt-4 flex items-center gap-3 text-sm text-[#4B5563]">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agree: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#1463FF]"
                  />
                  I agree to the{" "}
                  <Link href="/privacy-policy" className="text-[#1463FF]">
                    Privacy Policy
                  </Link>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-8 py-4 text-[12px] font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(20,99,255,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight size={16} />
                </button>

                {statusMessage && (
                  <p className="mt-3 text-center text-sm font-semibold text-[#1463FF]">
                    {statusMessage}
                  </p>
                )}

                <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
                  <Lock size={14} className="text-[#1463FF]" />
                  Your information is 100% secure and confidential.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-[#020817] py-14 text-white">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-[0.45fr_1.55fr] lg:px-12">
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                  Get In Touch
                </span>
              </div>

              <h2 className="text-[34px] font-black leading-[1.05] tracking-[-0.05em] sm:text-[42px]">
                Other ways <br />
                to reach us.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : "_self"}
                    className="group rounded-[16px] border border-[#1463FF]/25 bg-white/[0.04] p-7 transition-all hover:-translate-y-1 hover:border-[#1463FF]"
                  >
                    <Icon className="mb-8 text-[#1463FF]" size={34} />

                    <h3 className="text-2xl font-black tracking-[-0.04em]">
                      {card.title}
                    </h3>

                    <p className="mt-4 text-sm text-white/65">{card.desc}</p>

                    <p className="mt-5 text-sm font-bold text-white">
                      {card.value}
                    </p>

                    <span className="mt-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-all group-hover:bg-[#1463FF] group-hover:text-white">
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F7FBFF] py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,99,255,0.08),transparent_45%)]" />

          <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[0.35fr_1.65fr] lg:px-12">
            <div className="rounded-[20px] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-6 flex items-center gap-2">
                <Globe2 size={16} className="text-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1463FF]">
                  Global Collaboration
                </span>
              </div>

              <h2 className="text-[34px] font-black leading-[1.05] tracking-[-0.05em]">
                We work with clients from around the world.
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#4B5563]">
                No matter where you are, we&apos;re just a message away.
              </p>

              <div className="mt-8 flex -space-x-3">
                <Image
                  src="/muhammad-yasir-founder-ceo.webp"
                  alt="Team member"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="/yaseen.webp"
                  alt="Team member"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="/shair-afgun.webp"
                  alt="Team member"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover"
                />
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#1463FF] text-white">
                  <Plus size={18} />
                </span>
              </div>
            </div>

            <div className="relative min-h-[380px] overflow-hidden rounded-[22px]">
              <Image
                src="/world-map-dots.webp"
                alt="Global clients map"
                fill
                className="object-contain"
              />

              {locations.map((location) => (
                <div
                  key={location.name}
                  className={`absolute ${location.className} hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#05070D] shadow-[0_12px_35px_rgba(15,23,42,0.12)] md:flex`}
                >
                  <span className="h-4 w-4 rounded-full border-4 border-[#DCEBFF] bg-[#1463FF]" />
                  {location.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}