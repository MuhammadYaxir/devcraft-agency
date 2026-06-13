"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, HelpCircle, Loader2 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage?: string;
  techStack: string[];
  liveUrl?: string;
}

const categories = [
  "All",
  "Web Development",
  "SaaS",
  "AI & Automation",
  "E-Commerce",
  "Branding",
];

export default function PublicProjectsListingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        setHasFetchError(false);

        const response = await fetch("/api/projects?status=published", {
          cache: "no-store",
        });

        const json = await response.json();

        if (json.success && Array.isArray(json.data)) {
          setProjects(json.data);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Failed loading projects:", err);
        setHasFetchError(true);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7FBFF] text-[#05070D]">
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute left-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#1463FF]/10 blur-[110px]" />
          <div className="absolute right-[-180px] top-[420px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[110px]" />

          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="mb-14 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1463FF]/15 bg-[#1463FF]/5 px-4 py-2">
                  <span className="text-[#1463FF]">✦</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1463FF]">
                    Our Work
                  </span>
                </div>

                <h1 className="text-[58px] font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-[78px] lg:text-[104px]">
                  Selected <br />
                  <span className="bg-gradient-to-r from-[#1463FF] to-[#05C8F7] bg-clip-text text-transparent">
                    Work
                  </span>
                </h1>
              </div>

              <p className="max-w-xl text-base font-medium leading-8 text-[#4B5563] lg:justify-self-end">
                Explore websites, SaaS platforms, AI automation systems, and
                digital products built to help businesses grow online.
              </p>
            </div>

            <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] transition-all ${
                      activeCategory === category
                        ? "border-[#1463FF] bg-[#1463FF] text-white shadow-[0_14px_30px_rgba(20,99,255,0.22)]"
                        : "border-[#D9E3F0] bg-white/80 text-[#4B5563] hover:border-[#1463FF]/40 hover:text-[#1463FF]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <Link
                href="/contact"
                className="group hidden items-center gap-2 rounded-full bg-[#05070D] px-6 py-4 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_16px_40px_rgba(5,7,13,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#1463FF] lg:flex"
              >
                Start a Project
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="animate-spin text-[#1463FF]" size={42} />
              </div>
            ) : hasFetchError ? (
              <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-[28px] border border-[#D9E3F0] bg-white/90 p-14 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <HelpCircle className="mb-4 text-[#1463FF]" size={36} />
                <h3 className="mb-2 text-lg font-black uppercase">
                  Failed to Load Projects
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Please check your database connection or API route.
                </p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-[28px] border border-[#D9E3F0] bg-white/90 p-14 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <HelpCircle className="mb-4 text-[#1463FF]" size={36} />
                <h3 className="mb-2 text-lg font-black uppercase">
                  No Projects Found
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Publish projects from the dashboard to display them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project._id}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: index * 0.06 }}
                    className="group overflow-hidden rounded-[22px] border border-[#1463FF]/20 bg-[#020817] text-white shadow-[0_26px_80px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#18C8F6]/70 hover:shadow-[0_0_35px_rgba(20,99,255,0.22)]"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="relative block h-[265px] overflow-hidden"
                    >
                      {project.featuredImage ? (
                        <Image
                          src={project.featuredImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-white/[0.04] text-xs font-black uppercase tracking-[0.16em] text-white/35">
                          No Image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/85 via-[#020817]/10 to-transparent" />

                      <span className="absolute left-5 top-5 rounded-[7px] bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-white">
                        {project.category}
                      </span>
                    </Link>

                    <div className="p-6 sm:p-7">
                      <span className="mb-4 block text-[11px] font-black text-[#18C8F6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h2 className="mb-3 text-[28px] font-black leading-[1.03] tracking-[-0.045em]">
                        {project.title}
                      </h2>

                      <p className="mb-7 line-clamp-3 text-sm leading-6 text-white/60">
                        {project.description}
                      </p>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/link flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#18C8F6]"
                      >
                        View Case Study
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#18C8F6]/35 transition-all group-hover/link:bg-[#18C8F6] group-hover/link:text-[#020817]">
                          <ArrowRight size={14} />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            <div className="mt-10 rounded-[30px] border border-[#D9E3F0] bg-white/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1463FF]/15 bg-[#1463FF]/5 px-4 py-2">
                    <span className="text-[#1463FF]">✦</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1463FF]">
                      Have a project in mind?
                    </span>
                  </div>

                  <h2 className="max-w-2xl text-[34px] font-black leading-[1.05] tracking-[-0.05em] text-[#05070D] sm:text-[44px]">
                    Let&apos;s build something extraordinary together.
                  </h2>
                </div>

                <div className="flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-8 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(20,99,255,0.28)] transition-all hover:-translate-y-0.5"
                  >
                    Start a Project
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}