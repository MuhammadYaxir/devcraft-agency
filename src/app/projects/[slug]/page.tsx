import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaGithub } from "react-icons/fa";
// import Navbar from "@/components/navbar/Navbar";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Cpu,
  ExternalLink,
  Terminal,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import dbConnect from "@/backend/config/dbConnect";
import Project from "@/backend/models/Project";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category?: string;
  featuredImage?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: string;
}

async function fetchProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    await dbConnect();

    const project = await Project.findOne({
      slug,
      status: "published",
    }).lean();

    if (!project) return null;

    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Project fetch error:", error);
    return null;
  }
}

function formatDate(date?: string) {
  if (!date) return "Recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | CraftoDev",
    };
  }

  return {
    title: `${project.title} | CraftoDev`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.featuredImage ? [{ url: project.featuredImage }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FBFF] pt-28 text-[#05070D]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,99,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,99,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-[-160px] top-[160px] h-[420px] w-[420px] rounded-full bg-[#1463FF]/10 blur-[110px]" />
      <div className="absolute right-[-160px] top-[420px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[110px]" />

      <section className="relative z-10 mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-center justify-between gap-6">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 rounded-full border border-[#D9E3F0] bg-white/80 px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#05070D] shadow-[0_14px_35px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#1463FF]/40 hover:text-[#1463FF]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Projects
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9E3F0] bg-white/80 text-[#05070D] shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#1463FF]/40 hover:text-[#1463FF]"
              >
                <FaGithub size={16} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(20,99,255,0.28)] transition-all hover:-translate-y-0.5"
              >
                Live Demo
                <ExternalLink
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.14em]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1463FF]/15 bg-[#1463FF]/5 px-4 py-2 text-[#1463FF]">
              <Layers size={12} />
              {project.category || "Web Development"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9E3F0] bg-white/80 px-4 py-2 text-[#5F6B7A]">
              <Calendar size={12} />
              {formatDate(project.createdAt)}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-emerald-600">
              <ShieldCheck size={12} />
              Production Ready
            </span>
          </div>

          <h1 className="text-[42px] font-black uppercase leading-[0.95] tracking-[-0.06em] text-[#05070D] sm:text-[58px] lg:text-[76px]">
            {project.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-[#4B5563] sm:text-lg">
            {project.description}
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[32px] border border-[#D9E3F0] bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-[#020817]">
            <Image
              src={
                project.featuredImage ||
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600"
              }
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-[28px] border border-[#D9E3F0] bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8 lg:col-span-8">
            <div className="mb-6 flex items-center gap-2 border-b border-[#E6EDF7] pb-4 text-[#1463FF]">
              <Terminal size={15} />
              <h2 className="text-[11px] font-black uppercase tracking-[0.18em]">
                Project Overview
              </h2>
            </div>

            <div className="space-y-5 text-[15px] font-medium leading-8 text-[#4B5563]">
              {project.longDescription ? (
                project.longDescription
                  .split("\n")
                  .map((paragraph, index) =>
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                  )
              ) : (
                <p>No detailed project overview has been added yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#D9E3F0] bg-[#020817] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8 lg:col-span-4">
            <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-[#18C8F6]">
              <Cpu size={15} />
              <h2 className="text-[11px] font-black uppercase tracking-[0.18em]">
                Tech Stack
              </h2>
            </div>

            {project.techStack && project.techStack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/80"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-white/55">
                Tech stack will be added soon.
              </p>
            )}

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/45">
                Need Similar Project?
              </p>

              <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">
                Let&apos;s build your next product.
              </h3>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white"
              >
                Start a Project
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}