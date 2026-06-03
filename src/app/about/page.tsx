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
  { name: "Muhammad Yasir", role: "Founder & CEO", image: "/muhammad-yasir-founder-ceo.webp" },
  { name: "Ghulam Yaseen", role: "Seo Expert & Digital Marketer", image: "/yaseen.webp" },
  { name: "Shair Afgun", role: "Lead Developer", image: "/shair-afgun.webp" },
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

      <main className="bg-white pt-20 text-[#05070D]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-right bg-no-repeat"
            style={{ backgroundImage: "url('/about-hero.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[720px]"
            >
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
                  About CraftoDev
                </span>
              </div>

              <h1 className="text-[46px] font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-[68px] lg:text-[78px]">
                We Build Digital <br />
                Experiences <br />
                <span className="text-[#1463FF]">That Matter.</span>
              </h1>

              <p className="mt-8 max-w-md text-base font-medium leading-7 text-[#4B5563]">
                CraftoDev is where creativity meets technology. We help
                ambitious brands turn ideas into digital experiences that people
                love.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/projects"
                  className="group flex items-center gap-3 rounded-full bg-[#05070D] px-7 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#1463FF]"
                >
                  Our Work
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/contact"
                  className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#05070D]"
                >
                  Get To Know Us
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="bg-[#02060D] text-white">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              <div className="border-r border-white/10 p-10 sm:p-16">
                <div className="mb-8 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/60">
                    Our Mission
                  </span>
                </div>
                <Rocket className="mb-8 text-[#1463FF]" size={38} />
                <p className="max-w-sm text-lg leading-8 text-white/80">
                  To build innovative digital products and solutions that
                  empower businesses to grow, automate and lead in their
                  industries.
                </p>
              </div>

              <div className="p-10 sm:p-16">
                <div className="mb-8 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/60">
                    Our Vision
                  </span>
                </div>
                <Eye className="mb-8 text-[#1463FF]" size={38} />
                <p className="max-w-sm text-lg leading-8 text-white/80">
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
                className="object-cover grayscale"
              />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-12">
            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
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
                className="mt-10 inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em]"
              >
                Join Our Team
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {team.map((member) => (
    <div
      key={member.name}
      className="overflow-hidden rounded-xl border border-[#05070D]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-[320px] bg-[#F3F4F6]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-black text-[#05070D]">
          {member.name}
        </h3>

        <p className="mt-2 text-sm font-medium text-[#2563EB]">
          {member.role}
        </p>

        
      </div>
    </div>
  ))}
</div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#02060D] py-14 text-white">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-8 px-5 sm:px-8 md:grid-cols-5 lg:px-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${
                    index !== stats.length - 1
                      ? "md:border-r md:border-white/10"
                      : ""
                  }`}
                >
                  <Icon className="mb-5 text-[#1463FF]" size={30} />
                  <h3 className="text-4xl font-medium tracking-[-0.05em]">
                    {stat.value}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:px-12">
            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
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
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#05070D] text-white">
                      <Icon size={21} />
                    </div>

                    {index !== process.length - 1 && (
                      <div className="absolute left-14 top-7 hidden h-px w-full border-t border-dashed border-[#05070D]/30 md:block" />
                    )}

                    <span className="text-[11px] font-black text-[#6B7280]">
                      {item.id}
                    </span>
                    <h3 className="mt-2 text-sm font-black">
                      {item.title}
                    </h3>
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
<section className="relative min-h-[360px] overflow-hidden bg-[#02060D] py-20 text-white">
  <Image
    src="/about-cta.webp"
    alt="CraftoDev CTA"
    fill
    priority
    className="object-cover object-left-center opacity-80"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-[#02060D]/20 via-[#02060D]/60 to-[#02060D]/80" />

  <div className="relative z-10 mx-auto grid min-h-[220px] max-w-[1500px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
    <div />

    <div>
      <div className="mb-7 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
          Ready To Work Together?
        </span>
      </div>

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <h2 className="max-w-xl text-[42px] font-black leading-[1] tracking-[-0.05em]">
          Let’s build something extraordinary together.
        </h2>

        <Link
          href="/contact"
          className="group flex w-fit items-center gap-4 rounded-full bg-[#1463FF] px-9 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-[#05070D]"
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