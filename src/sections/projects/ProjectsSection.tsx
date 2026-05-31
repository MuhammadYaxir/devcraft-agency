"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
}

const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Finex.",
    slug: "finex",
    description:
      "Next-gen banking platform for the modern world with powerful insights.",
    category: "Fintech",
    featuredImage: "/projects/finex.webp",
    techStack: ["Next.js"],
    featured: true,
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Husky.",
    slug: "husky",
    description:
      "Sustainable living made simple through a clean digital experience.",
    category: "Lifestyle",
    featuredImage: "/projects/husky.webp",
    techStack: ["Next.js"],
    featured: true,
    status: "published",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Tankly.",
    slug: "tankly",
    description:
      "Project management dashboard built to help teams deliver faster.",
    category: "SaaS",
    featuredImage: "/projects/tankly.webp",
    techStack: ["Next.js"],
    featured: true,
    status: "published",
    createdAt: new Date().toISOString(),
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects?status=published");
        const json = await response.json();

        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjects(json.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed loading projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#02060D] py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1463FF12,transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-8">
          <div>
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
              Featured Work
            </p>

            <h2 className="max-w-md text-[34px] font-medium uppercase leading-[0.95] tracking-[-0.05em] text-white sm:text-[42px]">
              We don’t just <br />
              build websites. <br />
              We build impact.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group hidden items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] text-white lg:flex"
          >
            View All Projects
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition group-hover:border-[#1463FF] group-hover:text-[#1463FF]">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {projects.map((project, index) => {
            const isLightCard = index === 1;

            return (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`group overflow-hidden border ${
                  isLightCard
                    ? "border-white/20 bg-white text-[#05070D]"
                    : "border-white/15 bg-black text-white"
                }`}
              >
                {/* Image */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block h-[230px] overflow-hidden"
                >
                  <Image
                    src={
                      project.featuredImage ||
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200"
                    }
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-0 ${
                      isLightCard
                        ? "bg-white/5"
                        : "bg-gradient-to-t from-black/35 to-transparent"
                    }`}
                  />

                  <span
                    className={`absolute left-5 top-5 text-[9px] font-black uppercase tracking-[0.16em] ${
                      isLightCard ? "text-[#05070D]/55" : "text-white/60"
                    }`}
                  >
                    {project.category}
                  </span>
                </Link>

                {/* Content Under Image */}
                <div className="p-6">
                  <h3
                    className={`mb-3 text-[30px] font-black leading-[1] tracking-[-0.05em] ${
                      isLightCard ? "text-[#05070D]" : "text-white"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`mb-7 line-clamp-2 max-w-sm text-sm leading-6 ${
                      isLightCard ? "text-[#05070D]/65" : "text-white/60"
                    }`}
                  >
                    {project.description}
                  </p>

                  <Link
                    href={`/projects/${project.slug}`}
                    className={`group/link flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] ${
                      isLightCard ? "text-[#05070D]" : "text-white"
                    }`}
                  >
                    View Case Study
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                        isLightCard
                          ? "border-[#05070D]/25 group-hover/link:bg-[#05070D] group-hover/link:text-white"
                          : "border-white/25 group-hover/link:border-[#1463FF] group-hover/link:text-[#1463FF]"
                      }`}
                    >
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;