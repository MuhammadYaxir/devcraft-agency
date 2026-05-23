import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaGithub } from "react-icons/fa";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Cpu,
  ExternalLink,
  Terminal,
  ShieldCheck,
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
      title: "Project Not Found | YYDevs Agency",
    };
  }

  return {
    title: `${project.title} | YYDevs Agency`,
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
    <main className="min-h-screen bg-[#050816] text-white pt-32 pb-24 px-6 sm:px-8 lg:px-10 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <Link href="/projects">
            <button className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-purple-400 transition-colors">
              <ArrowLeft size={14} />
              <span>Back to Projects</span>
            </button>
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <button className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 text-gray-400 hover:text-white transition-all">
                  <FaGithub size={15} />
                </button>
              </a>
            )}

            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold flex items-center gap-2 transition-all">
                  <span>Live Demo</span>
                  <ExternalLink size={13} />
                </button>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center gap-2">
              <Layers size={12} />
              {project.category || "Web Development"}
            </span>

            <span className="flex items-center gap-2">
              <Calendar size={12} />
              {formatDate(project.createdAt)}
            </span>

            <span className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={12} />
              Production Ready
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight">
            {project.title}
          </h1>

          <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-3xl">
            {project.description}
          </p>
        </div>

        <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-white/5 relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-purple-400 border-b border-white/5 pb-3">
              <Terminal size={14} />
              <h2 className="text-xs font-bold uppercase tracking-widest">
                Project Overview
              </h2>
            </div>

            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
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

          <div className="lg:col-span-4 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-indigo-400 border-b border-white/5 pb-3">
              <Cpu size={14} />
              <h2 className="text-xs font-bold uppercase tracking-widest">
                Tech Stack
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(project.techStack || []).map((tech, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}