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
      <Navbar transparent />
      <main className="min-h-screen bg-[#02060D] text-white">
        <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1463FF22,transparent_35%),radial-gradient(circle_at_bottom_right,#0F172A,transparent_35%)]" />

          <div className="relative z-10 mx-auto max-w-[1500px]">
            <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70">
                    Our Work
                  </span>
                </div>

                <h1 className="text-[58px] font-black uppercase leading-[0.92] tracking-[-0.06em] sm:text-[78px] lg:text-[96px]">
                  Selected <br /> Work
                </h1>
              </div>

              <div className="flex flex-col gap-10 lg:items-end">
                <Link
                  href="/contact"
                  className="hidden h-28 w-28 items-center justify-center rounded-full border border-white/15 text-center text-[10px] font-black uppercase tracking-[0.16em] text-white/70 transition hover:border-[#1463FF] hover:text-[#1463FF] lg:flex"
                >
                  Start <br /> Project
                </Link>
              </div>
            </div>

            <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative text-[11px] font-black uppercase tracking-[0.12em] transition ${
                      activeCategory === category
                        ? "text-white"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {category}
                    <span
                      className={`absolute -bottom-3 left-0 h-1 w-1 rounded-full bg-[#1463FF] transition ${
                        activeCategory === category ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="animate-spin text-[#1463FF]" size={42} />
              </div>
            ) : hasFetchError ? (
              <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-14 text-center">
                <HelpCircle className="mb-4 text-[#1463FF]" size={36} />
                <h3 className="mb-2 text-lg font-black uppercase">
                  Failed to Load Projects
                </h3>
                <p className="text-sm text-white/50">
                  Please check your database connection or API route.
                </p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-14 text-center">
                <HelpCircle className="mb-4 text-[#1463FF]" size={36} />
                <h3 className="mb-2 text-lg font-black uppercase">
                  No Projects Found
                </h3>
                <p className="text-sm text-white/50">
                  Publish projects from the dashboard to display them here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project._id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.05 }}
                    className="group grid min-h-[310px] overflow-hidden rounded-xl border border-white/10 bg-black/40 lg:grid-cols-[420px_1fr]"
                  >
                    <div className="flex flex-col justify-between border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
                      <div>
                        <div className="mb-10 flex items-center gap-10">
                          <span className="text-lg font-black">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                            {project.category}
                          </span>
                        </div>

                        <h2 className="mb-6 text-4xl font-black tracking-[-0.05em]">
                          {project.title}
                        </h2>

                        <p className="max-w-xs text-base leading-7 text-white/65">
                          {project.description}
                        </p>
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/link mt-8 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em]"
                      >
                        View Case Study
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition group-hover/link:border-[#1463FF] group-hover/link:text-[#1463FF]">
                          <ArrowRight size={15} />
                        </span>
                      </Link>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="relative min-h-[300px] overflow-hidden"
                    >
                      {project.featuredImage ? (
                        <Image
                          src={project.featuredImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full min-h-[300px] items-center justify-center bg-white/[0.04] text-sm font-bold uppercase tracking-[0.16em] text-white/40">
                          No Image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1463FF]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/60">
                      Have a project in mind?
                    </span>
                  </div>

                  <h2 className="max-w-lg text-4xl font-black leading-tight tracking-[-0.04em]">
                    Let’s build something extraordinary together.
                  </h2>
                </div>

                <div className="flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-3 rounded-full bg-[#1463FF] px-8 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
                  >
                    Start a Project
                    <ArrowUpRight size={16} />
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