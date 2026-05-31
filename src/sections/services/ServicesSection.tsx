"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";

import {
  ArrowRight,
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

      <main className="bg-white pt-12 text-[#05070D]">
        {/* Hero */}
        <section className="relative h-[calc(100vh-80px)] min-h-[620px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero-crystal-fulll.webp')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r   to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
            <div className="max-w-[720px]">
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
                  What We Do
                </span>
              </div>

              <h1 className="text-[48px] font-black uppercase leading-[0.92] tracking-[-0.06em] sm:text-[72px] lg:text-[86px]">
                Services <br />
                Designed For <br />
                <span className="text-[#1463FF]">Growth</span>
              </h1>

              <p className="mt-8 max-w-md text-base font-medium leading-7 text-[#4B5563]">
                We help ambitious businesses build powerful digital experiences,
                automate operations and scale faster with technology.
              </p>

              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-4 rounded-full bg-[#05070D] px-7 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#1463FF]"
              >
                Let&apos;s Work Together
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section>
          {services.map((service, index) => {
            const Icon = service.icon;
            const imageFirst = index % 2 === 1;

            return (
              <div
                key={service.id}
                className="grid min-h-[380px] grid-cols-1 border-t border-[#05070D]/10 lg:grid-cols-2"
              >
                <div
                  className={`flex items-center px-5 py-16 sm:px-8 lg:px-24 ${
                    imageFirst ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="max-w-md">
                    <span className="mb-8 block text-sm font-black">
                      {service.id}
                    </span>

                    <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-xl border border-[#05070D]/15 text-[#1463FF]">
                      <Icon size={32} />
                    </div>

                    <h2 className="mb-6 text-[36px] font-black leading-none tracking-[-0.05em]">
                      {service.title}
                    </h2>

                    <p className="mb-10 text-sm font-medium leading-7 text-[#4B5563]">
                      {service.desc}
                    </p>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-5 text-[11px] font-black uppercase tracking-[0.12em]"
                    >
                      Learn More
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>

                    <div className="mt-3 h-[2px] w-24 bg-[#1463FF]" />
                  </div>
                </div>

                <div
                  className={`relative min-h-[330px] overflow-hidden bg-[#F5F7FB] ${
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
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-[#02060D] py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1463FF25,transparent_35%)]" />

          <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                  Have a project in mind?
                </span>
              </div>

              <h2 className="max-w-xl text-[42px] font-black leading-[1] tracking-[-0.05em]">
                Let’s build something extraordinary together.
              </h2>
            </div>

            <div className="flex lg:justify-end">
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
        </section>
      </main>
    </>
  );
}