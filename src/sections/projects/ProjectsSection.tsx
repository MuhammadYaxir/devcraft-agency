"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
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

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/projects?status=published", {
          cache: "no-store",
        });

        const json = await response.json();

        if (json.success && Array.isArray(json.data)) {
          setProjects(json.data.slice(0, 3));
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Failed loading projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#020817] py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,99,255,0.18),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035),transparent_22%)]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#1463FF]">
              Featured Work
            </p>

            <h2 className="max-w-md text-[34px] font-black uppercase leading-[0.95] tracking-[-0.05em] text-white sm:text-[42px] lg:text-[48px]">
              We don’t just <br />
              build websites. <br />
              We build impact.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group hidden items-center gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-[#1463FF] lg:flex"
          >
            View All Projects
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all group-hover:border-[#1463FF] group-hover:bg-[#1463FF]">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center">
            <Loader2 className="animate-spin text-[#1463FF]" size={38} />
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h3 className="mb-2 text-xl font-bold">No projects found</h3>
            <p className="text-sm text-white/55">
              Add published projects from your dashboard to show them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[18px] border border-[#1463FF]/35 bg-[#031022] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#16C8F6]/70 hover:shadow-[0_0_35px_rgba(20,99,255,0.28)]"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative block h-[255px] overflow-hidden"
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
                    <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-xs font-black uppercase tracking-[0.16em] text-white/35">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/80 via-[#020817]/15 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-[6px] bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_25px_rgba(20,99,255,0.28)]">
                    {project.category}
                  </span>
                </Link>

                <div className="p-6 sm:p-7">
                  <h3 className="mb-3 text-[26px] font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-[29px]">
                    {project.title}
                  </h3>

                  <p className="mb-7 line-clamp-3 max-w-sm text-sm leading-6 text-white/60">
                    {project.description}
                  </p>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/link flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-[#18C8F6]"
                  >
                    View Case Study
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#18C8F6]/35 text-[#18C8F6] transition-all group-hover/link:bg-[#18C8F6] group-hover/link:text-[#020817]">
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <Link
          href="/projects"
          className="mt-8 flex w-fit items-center gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-[#1463FF] lg:hidden"
        >
          View All Projects
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white">
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;