"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Bot,
  Cloud,
  PenTool,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Web Development",
    desc: "High-performance websites and web applications built with clean code, modern technologies and scalable architecture.",
    icon: Code2,
    image: "/services/web-development.webp",
  },
  {
    id: "02",
    title: "AI & Automation",
    desc: "Smart automation systems and AI solutions that save time, reduce costs and help you scale faster.",
    icon: Bot,
    image: "/services/ai-automation.webp",
  },
  {
    id: "03",
    title: "SaaS Development",
    desc: "End-to-end SaaS product development from idea to launch. Scalable, secure and built for growth.",
    icon: Cloud,
    image: "/services/saas-development.webp",
  },
  {
    id: "04",
    title: "UI/UX Design",
    desc: "Beautiful, intuitive and conversion-focused designs that create unforgettable user experiences.",
    icon: PenTool,
    image: "/services/ui-ux.webp",
  },
  {
    id: "05",
    title: "Digital Marketing",
    desc: "Data-driven SEO, content and performance marketing strategies that bring traffic, leads and results.",
    icon: TrendingUp,
    image: "/services/digital-marketing.webp",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7FBFF] text-[#05070D]">
        {/* Hero - Same as Home Hero */}
        <section className="relative min-h-[720px] overflow-hidden bg-[#F7FBFF] pt-24 text-[#05070D]">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAF6FF]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="pointer-events-none absolute right-[-120px] top-[-80px] hidden h-[950px] w-[1500px] bg-contain bg-center bg-no-repeat lg:block xl:right-[-20px]"
            style={{
              backgroundImage: "url('/hero-crystal-fulll.webp')",
            }}
          />

          <div className="absolute left-[53%] top-[36%] hidden h-2 w-2 rounded-full bg-cyan-400 lg:block" />
          <div className="absolute left-[60%] top-[48%] hidden h-1.5 w-1.5 rounded-full bg-cyan-400 lg:block" />

          <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[720px]"
            >
              <div className="mb-6 flex items-center gap-2">
                <span className="text-[#1463FF]">✦</span>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1463FF] sm:text-[11px]">
                  What We Do
                </span>
              </div>

              <h1 className="text-[46px] font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#05070D] sm:text-[64px] md:text-[78px] lg:text-[92px] xl:text-[104px]">
                Services <br />
                Designed For <br />
                <span className="text-[#1463FF]">Growth</span>
              </h1>

              <p className="mt-6 max-w-[500px] text-[15px] font-medium leading-7 text-[#4B5563] sm:text-base">
                We help ambitious businesses build powerful websites, AI
                automation systems, SaaS products, and digital experiences that
                drive measurable growth.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(20,99,255,0.28)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Let&apos;s Work Together
                  <ArrowRight
                    size={15}
                    strokeWidth={3}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/projects"
                  className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#D9E3F0] bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#05070D] shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1463FF]/40 hover:text-[#1463FF]"
                >
                  View Work
                  <ArrowUpRight
                    size={15}
                    strokeWidth={3}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7FBFF] to-transparent" />
        </section>

        {/* Services */}
        <section className="mx-auto max-w-[1500px] px-5 pb-8 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            {services.map((service, index) => {
              const Icon = service.icon;
              const imageFirst = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  className="grid min-h-[430px] grid-cols-1 overflow-hidden border-b border-[#E6EDF7] last:border-b-0 lg:grid-cols-2"
                >
                  <div
                    className={`flex items-center bg-white px-7 py-16 sm:px-10 lg:px-12 ${
                      imageFirst ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="max-w-md">
                      <span className="mb-8 block text-xl font-black text-[#1463FF]">
                        {service.id}
                      </span>

                      <div className="mb-9 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1463FF]/5 text-[#1463FF] shadow-[0_14px_35px_rgba(20,99,255,0.08)]">
                        <Icon size={30} strokeWidth={2.2} />
                      </div>

                      <h2 className="mb-5 text-[34px] font-black leading-none tracking-[-0.05em] sm:text-[38px]">
                        {service.title}
                      </h2>

                      <p className="mb-8 max-w-sm text-sm font-medium leading-7 text-[#4B5563]">
                        {service.desc}
                      </p>

                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.12em] text-[#1463FF]"
                      >
                        Learn More
                        <ArrowRight
                          size={16}
                          className="transition group-hover:translate-x-1"
                        />
                      </Link>

                      <div className="mt-3 h-[2px] w-20 bg-[#1463FF]" />
                    </div>
                  </div>

                  <div
                    className={`relative min-h-[330px] overflow-hidden bg-[#EAF3FF] ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[20px] bg-[#020817] px-8 py-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,99,255,0.35),transparent_34%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,99,255,0.22),transparent_45%,rgba(5,200,247,0.18))]" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                    Have a project in mind?
                  </span>
                </div>

                <h2 className="max-w-xl text-[34px] font-black leading-[1] tracking-[-0.05em] sm:text-[42px]">
                  Let&apos;s build something extraordinary together.
                </h2>
              </div>

              <div className="flex lg:justify-end">
                <Link
                  href="/contact"
                  className="group flex w-fit items-center gap-4 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-9 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(20,99,255,0.28)] transition hover:-translate-y-0.5"
                >
                  Start a Project
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}