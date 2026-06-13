"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Eye,
  BriefcaseBusiness,
  Users,
  Globe2,
  Star,
  Search,
  PenTool,
  Code2,
  Send,
} from "lucide-react";

const team = [
  {
    name: "Muhammad Yasir",
    role: "Founder & CEO",
    image: "/muhammad-yasir-founder-ceo.webp",
  },
  {
    name: "Ghulam Yaseen",
    role: "Seo Expert & Digital Marketer",
    image: "/yaseen.webp",
  },
  {
    name: "Shair Afgun",
    role: "Lead Developer",
    image: "/shair-afgun.webp",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered", icon: BriefcaseBusiness },
  { value: "30+", label: "Happy Clients", icon: Users },
  { value: "5+", label: "Years of Experience", icon: Rocket },
  { value: "15+", label: "Countries Served", icon: Globe2 },
  { value: "4.9/5", label: "Client Rating", icon: Star },
];

const process = [
  {
    id: "01",
    title: "Discover",
    desc: "We understand your business, goals and audience.",
    icon: Search,
  },
  {
    id: "02",
    title: "Strategize",
    desc: "We plan the right strategy and roadmap tailored to your needs.",
    icon: PenTool,
  },
  {
    id: "03",
    title: "Design & Build",
    desc: "We design and develop powerful solutions that deliver results.",
    icon: Code2,
  },
  {
    id: "04",
    title: "Launch & Grow",
    desc: "We launch, optimize and support your growth continuously.",
    icon: Send,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-[#05070D]">
        {/* Hero */}
        <section className="relative min-h-[720px] overflow-hidden bg-[#F7FBFF] pt-24 text-[#05070D]">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAF6FF]" />

          <div className="absolute right-0 top-0 hidden h-full w-[58%] bg-gradient-to-l from-[#EAF6FF] via-white/70 to-transparent lg:block" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="pointer-events-none absolute right-[-120px] top-[-20px] hidden h-[950px] w-[1200px] bg-contain bg-center bg-no-repeat lg:block xl:right-[-20px]"
            style={{
              backgroundImage: "url('/about-hero.webp')",
            }}
          />

          {/* Clean right-side dots only */}
          <div className="absolute left-[58%] top-[15%] hidden h-2 w-2 rounded-full bg-[#1463FF]/80 lg:block" />
          <div className="absolute left-[70%] top-[40%] hidden h-1.5 w-1.5 rounded-full bg-[#1463FF]/70 lg:block" />
          <div className="absolute right-[18%] top-[24%] hidden h-1.5 w-1.5 rounded-full bg-[#1463FF]/70 lg:block" />

          <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[720px]"
            >
              <div className="mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#05070D]/70">
                  About CraftoDev
                </span>
              </div>

              <h1 className="text-[46px] font-black uppercase leading-[0.92] tracking-[-0.055em] text-[#05070D] sm:text-[64px] md:text-[78px] lg:text-[92px]">
                We Build <br />
                Digital <br />
                Experiences <br />
                <span className="text-[#1463FF]">That Matter.</span>
              </h1>

              <p className="mt-6 max-w-[520px] text-[15px] font-medium leading-7 text-[#4B5563] sm:text-base">
                CraftoDev is where creativity meets technology. We help
                ambitious brands turn ideas into digital experiences that people
                love.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/projects"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(20,99,255,0.28)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Our Work
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#1463FF]/40 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#1463FF] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1463FF] hover:text-white"
                >
                  Get To Know Us
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="bg-[#020817] text-white">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="border-b border-white/10 p-10 sm:border-b-0 sm:border-r sm:p-16">
                <div className="mb-8 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                    Our Mission
                  </span>
                </div>

                <Rocket className="mb-8 text-[#1463FF]" size={42} />

                <p className="max-w-sm text-lg leading-8 text-white/85">
                  To build innovative digital products and solutions that
                  empower businesses to grow, automate and lead in their
                  industries.
                </p>
              </div>

              <div className="p-10 sm:p-16">
                <div className="mb-8 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                    Our Vision
                  </span>
                </div>

                <Eye className="mb-8 text-[#1463FF]" size={42} />

                <p className="max-w-sm text-lg leading-8 text-white/85">
                  To become a global digital agency recognized for delivering
                  high-impact solutions through technology, creativity and
                  trust.
                </p>
              </div>
            </div>

            <div className="relative min-h-[360px]">
              <Image
                src="/about-mission.webp"
                alt="CraftoDev mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-12">
            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1463FF]">
                  The Team
                </span>
              </div>

              <h2 className="text-[38px] font-black leading-[1] tracking-[-0.05em]">
                The minds behind <br />
                CraftoDev.
              </h2>

              <p className="mt-8 max-w-sm text-base leading-7 text-[#4B5563]">
                We are a team of creators, engineers, designers and strategists
                who are passionate about building exceptional digital
                experiences.
              </p>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#1463FF]"
              >
                Join Our Team
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="overflow-hidden rounded-[14px] border border-[#E6EDF7] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-[330px] bg-[#F3F6FB]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-black text-[#05070D]">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-[#1463FF]">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#020817] py-14 text-white">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-8 px-5 sm:px-8 md:grid-cols-5 lg:px-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={
                    index !== stats.length - 1
                      ? "md:border-r md:border-white/10"
                      : ""
                  }
                >
                  <Icon className="mb-5 text-[#1463FF]" size={32} />
                  <h3 className="text-4xl font-medium tracking-[-0.05em]">
                    {stat.value}
                  </h3>
                  <p className="mt-2 text-sm text-white/75">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-12">
            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1463FF]">
                  Our Approach
                </span>
              </div>

              <h2 className="text-[38px] font-black leading-[1] tracking-[-0.05em]">
                A proven process <br />
                for success.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {process.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.id} className="relative">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#1463FF] text-white shadow-[0_18px_35px_rgba(20,99,255,0.24)]">
                      <Icon size={23} />
                    </div>

                    {index !== process.length - 1 && (
                      <div className="absolute left-16 top-8 hidden h-px w-full border-t border-dashed border-[#05070D]/20 md:block" />
                    )}

                    <span className="text-[11px] font-black text-[#1463FF]">
                      {item.id}
                    </span>

                    <h3 className="mt-2 text-sm font-black">{item.title}</h3>

                    <p className="mt-4 text-sm leading-7 text-[#4B5563]">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative min-h-[360px] overflow-hidden bg-[#020817] py-20 text-white">
          <Image
            src="/about-cta.webp"
            alt="CraftoDev CTA"
            fill
            priority
            className="object-cover object-left opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/15 via-[#020817]/65 to-[#020817]/90" />

          <div className="relative z-10 mx-auto grid min-h-[220px] max-w-[1500px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
            <div />

            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/75">
                  Ready To Work Together?
                </span>
              </div>

              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <h2 className="max-w-xl text-[42px] font-black leading-[1] tracking-[-0.05em]">
                  Let&apos;s build something extraordinary together.
                </h2>

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