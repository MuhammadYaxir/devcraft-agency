"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Clock,
  Code2,
  Bot,
  Cloud,
  PenTool,
  TrendingUp,
  BriefcaseBusiness,
  Briefcase,
  Users,
  Rocket,
  Globe2,
  Star,
  Send,
  Download,
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  featuredImage?: string;
  createdAt?: string;
}

const fallbackImage = "/blog/blog-fallback.webp";

const categories = [
  { name: "All Articles", icon: null },
  { name: "Web Development", icon: Code2 },
  { name: "AI & Automation", icon: Bot },
  { name: "SaaS", icon: Cloud },
  { name: "Design", icon: PenTool },
  { name: "SEO & Marketing", icon: TrendingUp },
  { name: "Business", icon: BriefcaseBusiness },
];

const stats = [
  { value: "50+", label: "Projects Delivered", icon: Briefcase },
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

function formatDate(date?: string) {
  if (!date) return "Recently";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/blogs?status=published", {
          cache: "no-store",
        });

        const json = await response.json();

        if (response.ok && json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Failed loading blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchPublishedBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.category || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All Articles" || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredBlog = filteredBlogs[0];
  const latestBlogs = filteredBlogs.slice(1);

  return (
    <>
      <Navbar transparent />

      <main className="bg-white text-[#05070D]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#020817] pt-20 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100"
            style={{ backgroundImage: "url('/blog/insights-hero.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/90 to-[#020817]/10" />

          <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
            <div className="max-w-[720px]">
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                  Our Blog
                </span>
              </div>

              <h1 className="text-[48px] font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-[72px] lg:text-[82px]">
                Insights That <br />
                Drive{" "}
                <span className="bg-gradient-to-r from-[#1463FF] to-[#05C8F7] bg-clip-text text-transparent">
                  Growth
                </span>
              </h1>

              <p className="mt-8 max-w-md text-base font-medium leading-8 text-white/70">
                Expert insights, guides and strategies on AI, automation, web
                development and digital growth to help your business stay ahead.
              </p>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] text-white"
              >
                Subscribe To Our Newsletter
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1463FF]/70 text-[#1463FF]">
                  <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-[#D9E3F0] bg-white py-6">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-2 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-[0.08em] transition-all ${
                      active
                        ? "bg-[#1463FF] text-white shadow-[0_14px_30px_rgba(20,99,255,0.22)]"
                        : "border border-[#D9E3F0] bg-white text-[#05070D] hover:border-[#1463FF]/40 hover:text-[#1463FF]"
                    }`}
                  >
                    {Icon && <Icon size={14} />}
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-[310px]">
              <Search
                size={16}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1463FF]"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#D9E3F0] bg-white py-4 pl-12 pr-5 text-sm outline-none transition focus:border-[#1463FF]"
              />
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-12">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_380px] lg:px-12">
            <div>
              {loading ? (
                <div className="flex min-h-[420px] items-center justify-center rounded-[18px] border border-[#D9E3F0] bg-[#F7FBFF]">
                  <p className="text-sm font-bold text-[#6B7280]">
                    Loading articles...
                  </p>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[18px] border border-[#D9E3F0] bg-[#F7FBFF] text-center">
                  <h2 className="text-2xl font-black">No articles found</h2>
                  <p className="mt-3 max-w-md text-sm leading-7 text-[#6B7280]">
                    No published blog posts are available right now.
                  </p>
                </div>
              ) : (
                <>
                  {featuredBlog && (
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      <motion.article
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative mb-10 min-h-[430px] overflow-hidden rounded-[16px] bg-[#020817] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:p-10"
                      >
                        <Image
                          src={featuredBlog.featuredImage || fallbackImage}
                          alt={featuredBlog.title}
                          fill
                          priority
                          className="object-cover opacity-75 transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/85 to-transparent" />

                        <div className="relative z-10 max-w-lg">
                          <div className="mb-7 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                              Featured Article
                            </span>
                          </div>

                          <h2 className="text-[34px] font-black leading-[1.05] tracking-[-0.05em] sm:text-[42px]">
                            {featuredBlog.title}
                          </h2>

                          <p className="mt-7 max-w-md text-sm leading-7 text-white/70">
                            {featuredBlog.excerpt}
                          </p>

                          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                            <span>CraftoDev</span>
                            <span>•</span>
                            <span>{formatDate(featuredBlog.createdAt)}</span>
                            <span>•</span>
                            <span>8 min read</span>
                          </div>

                          <div className="mt-9 inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                            Read Article
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1463FF]/70 text-[#1463FF] transition group-hover:bg-[#1463FF] group-hover:text-white">
                              <ArrowRight size={15} />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  )}

                  <div className="mb-7 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1463FF]">
                      Latest Articles
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    {latestBlogs.map((blog, index) => (
                      <motion.article
                        key={blog._id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group overflow-hidden rounded-[16px] border border-[#D9E3F0] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1"
                      >
                        <Link href={`/blog/${blog.slug}`}>
                          <div className="relative h-[210px] overflow-hidden bg-[#F7FBFF]">
                            <Image
                              src={blog.featuredImage || fallbackImage}
                              alt={blog.title}
                              fill
                              className="object-cover transition duration-700 group-hover:scale-105"
                            />
                          </div>

                          <div className="p-6">
                            <div className="mb-5 flex items-center justify-between gap-4">
                              <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[#1463FF]">
                                {blog.category || "Development"}
                              </span>

                              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#6B7280]">
                                {formatDate(blog.createdAt)}
                              </span>
                            </div>

                            <h3 className="text-2xl font-black leading-[1.1] tracking-[-0.04em]">
                              {blog.title}
                            </h3>

                            <div className="mt-7 flex items-center justify-between">
                              <span className="inline-flex items-center gap-2 text-xs text-[#6B7280]">
                                <Clock size={14} />6 min read
                              </span>

                              <span className="inline-flex items-center gap-2 text-xs font-black text-[#1463FF]">
                                Read more <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-[16px] border border-[#D9E3F0] bg-[#F7FBFF] p-7">
                <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.18em]">
                  Popular Topics
                </h3>

                <div className="space-y-4">
                  {categories.slice(1).map((cat) => {
                    const Icon = cat.icon || Code2;
                    const count = blogs.filter(
                      (blog) => blog.category === cat.name
                    ).length;

                    return (
                      <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className="flex w-full items-center justify-between border-b border-[#D9E3F0] pb-3 text-sm font-bold last:border-b-0"
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={16} className="text-[#1463FF]" />
                          {cat.name}
                        </span>
                        <span className="text-[#6B7280]">
                          {count} articles
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveCategory("All Articles")}
                  className="mt-6 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#1463FF]"
                >
                  View All Topics
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="rounded-[16px] bg-gradient-to-br from-[#1463FF] to-[#05C8F7] p-7 text-white">
                <div className="mb-5 flex items-center gap-2">
                  <Send size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
                    Stay Updated
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight">
                  Get the latest insights delivered to your inbox.
                </h3>

                <div className="mt-6 flex overflow-hidden rounded-xl bg-white p-2">
                  <input
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 px-3 text-sm text-[#05070D] outline-none"
                  />
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1463FF] text-white">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="rounded-[16px] border border-[#D9E3F0] bg-[#F7FBFF] p-7">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1463FF]">
                    Free Resource
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight">
                  AI Automation Checklist For Business Owners
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#4B5563]">
                  A practical checklist to help you identify and automate
                  repetitive tasks in your business.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#1463FF]"
                >
                  Download Free Checklist
                  <Download size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-8 rounded-[16px] border border-[#D9E3F0] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:grid-cols-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={
                    index !== stats.length - 1
                      ? "md:border-r md:border-[#D9E3F0]"
                      : ""
                  }
                >
                  <Icon className="mb-4 text-[#1463FF]" size={32} />
                  <h3 className="text-4xl font-black tracking-[-0.05em]">
                    {stat.value}
                  </h3>
                  <p className="mt-2 text-sm text-[#4B5563]">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section className="bg-white pb-16">
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
        <section className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-8 py-10 text-white sm:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_35%)]" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
                    Ready To Work Together?
                  </span>
                </div>

                <h2 className="max-w-xl text-[34px] font-black leading-[1] tracking-[-0.05em] sm:text-[42px]">
                  Let&apos;s build something extraordinary together.
                </h2>
              </div>

              <div className="flex lg:justify-end">
                <Link
                  href="/contact"
                  className="group flex w-fit items-center gap-4 rounded-full bg-white px-9 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#1463FF] transition hover:-translate-y-0.5"
                >
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
</>
    
  
  );
}