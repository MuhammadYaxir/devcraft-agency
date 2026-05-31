"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Calendar,
  Clock,
  Code2,
  Bot,
  Cloud,
  PenTool,
  TrendingUp,
  BriefcaseBusiness,
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

const fallbackBlogs: Blog[] = [
  {
    _id: "1",
    title: "How AI Automation Saves Businesses 20+ Hours Per Week",
    slug: "ai-automation-saves-time",
    excerpt:
      "Discover how AI automation streamlines workflows, reduces manual tasks and helps businesses save time and scale faster.",
    category: "AI & Automation",
    featuredImage: "/blog/featured-ai.webp",
    createdAt: "2024-05-18",
  },
  {
    _id: "2",
    title: "10 Web Development Trends To Watch In 2024",
    slug: "web-development-trends",
    excerpt: "Modern web trends every business should understand.",
    category: "Web Development",
    featuredImage: "/blog/web-trends.webp",
    createdAt: "2024-05-15",
  },
  {
    _id: "3",
    title: "SaaS Product Checklist: From Idea To Launch",
    slug: "saas-product-checklist",
    excerpt: "A practical checklist for launching scalable SaaS products.",
    category: "SaaS",
    featuredImage: "/blog/saas-checklist.webp",
    createdAt: "2024-05-12",
  },
  {
    _id: "4",
    title: "8 Ways AI Can Transform Your Business Operations",
    slug: "ai-business-operations",
    excerpt: "Use AI systems to improve daily business workflows.",
    category: "AI & Automation",
    featuredImage: "/blog/ai-operations.webp",
    createdAt: "2024-05-10",
  },
  {
    _id: "5",
    title: "On-Page SEO Best Practices For Higher Rankings",
    slug: "seo-best-practices",
    excerpt: "Simple SEO improvements that help pages rank better.",
    category: "SEO & Marketing",
    featuredImage: "/blog/seo.webp",
    createdAt: "2024-05-08",
  },
  {
    _id: "6",
    title: "UI/UX Design Principles That Improve Conversions",
    slug: "ui-ux-conversions",
    excerpt: "Design principles that improve trust and conversions.",
    category: "Design",
    featuredImage: "/blog/uiux.webp",
    createdAt: "2024-05-05",
  },
  {
    _id: "7",
    title: "How To Build A Scalable Digital Business In 2024",
    slug: "scalable-digital-business",
    excerpt: "A growth-focused guide for modern online businesses.",
    category: "Business",
    featuredImage: "/blog/business-growth.webp",
    createdAt: "2024-05-01",
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
  const [blogs, setBlogs] = useState<Blog[]>(fallbackBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?status=published");
        const json = await response.json();

        if (response.ok && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setBlogs(json.data);
        }
      } catch (error) {
        console.error("Failed loading blogs:", error);
      }
    };

    fetchPublishedBlogs();
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
        <section className="relative overflow-hidden bg-[#02060D] pt-20 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: "url('/blog/insights-hero.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] " />

          <div className="relative z-10 mx-auto grid min-h-[520px] max-w-[1500px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div>
              <div className="mb-7 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                  Our Blog
                </span>
              </div>

              <h1 className="text-[48px] font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-[72px] lg:text-[82px]">
                Insights That <br />
                Drive <span className="text-[#1463FF]">Growth</span>
              </h1>

              <p className="mt-8 max-w-md text-base font-medium leading-8 text-white/70">
                Expert insights, guides and strategies on AI, automation, web
                development and digital growth to help your business stay ahead.
              </p>

              <Link
                href="/contact"
                className="mt-10 pb-8 inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.12em] text-white"
              >
                Subscribe To Our Newsletter
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25">
                  <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-[#05070D]/10 bg-white py-8">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-2 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-[0.08em] transition ${
                      active
                        ? "bg-[#05070D] text-white"
                        : "text-[#05070D] hover:bg-[#F3F4F6]"
                    }`}
                  >
                    {Icon && <Icon size={14} />}
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-[300px]">
              <Search
                size={16}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#05070D]/15 bg-white py-4 pl-12 pr-5 text-sm outline-none transition focus:border-[#1463FF]"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_340px] lg:px-12">
            <div>
              {featuredBlog && (
                <Link href={`/blog/${featuredBlog.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative mb-10 min-h-[420px] overflow-hidden rounded-xl bg-[#02060D] p-10 text-white"
                  >
                    <Image
                      src={featuredBlog.featuredImage || fallbackImage}
                      alt={featuredBlog.title}
                      fill
                      priority
                      className="object-cover opacity-75 transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/80 to-transparent" />

                    <div className="relative z-10 max-w-lg">
                      <div className="mb-7 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                          Featured Article
                        </span>
                      </div>

                      <h2 className="text-[38px] font-black leading-[1.05] tracking-[-0.05em]">
                        {featuredBlog.title}
                      </h2>

                      <p className="mt-7 max-w-md text-sm leading-7 text-white/70">
                        {featuredBlog.excerpt}
                      </p>

                      <div className="mt-9 flex items-center gap-6 text-sm text-white/70">
                        <span>Hamza</span>
                        <span>•</span>
                        <span>{formatDate(featuredBlog.createdAt)}</span>
                        <span>•</span>
                        <span>8 min read</span>
                      </div>

                      <div className="mt-10 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em]">
                        Read Article
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              )}

              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
                    Latest Articles
                  </span>
                </div>

                <Link
                  href="/blog"
                  className="hidden items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em] lg:flex"
                >
                  View All Articles
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {latestBlogs.map((blog) => (
                  <Link key={blog._id} href={`/blog/${blog.slug}`}>
                    <article className="group overflow-hidden rounded-xl border border-[#05070D]/10 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative h-[180px] overflow-hidden">
                        <Image
                          src={blog.featuredImage || fallbackImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.08em] text-[#6B7280]">
                          <span className="text-[#1463FF]">
                            {blog.category || "Web Development"}
                          </span>
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>

                        <h3 className="min-h-[56px] text-lg font-black leading-tight">
                          {blog.title}
                        </h3>

                        <div className="mt-6 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-[#6B7280]">
                            <Clock size={15} />
                            6 min read
                          </span>

                          <span className="font-black">Read more →</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-xl border border-[#05070D]/10 bg-[#F7F9FC] p-8">
                <h3 className="mb-6 text-[12px] font-black uppercase tracking-[0.12em]">
                  Popular Topics
                </h3>

                {[
                  ["Web Development", "24 articles"],
                  ["AI & Automation", "18 articles"],
                  ["SaaS Development", "16 articles"],
                  ["UI/UX Design", "22 articles"],
                  ["SEO & Marketing", "19 articles"],
                  ["Business Growth", "14 articles"],
                ].map(([topic, count]) => (
                  <div
                    key={topic}
                    className="flex justify-between border-b border-[#05070D]/10 py-4 text-sm last:border-b-0"
                  >
                    <span>{topic}</span>
                    <span className="text-[#6B7280]">{count}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[#05070D]/10 bg-white p-8">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1463FF]">
                    Stay Updated
                  </span>
                </div>

                <h3 className="mb-6 text-2xl font-black leading-tight">
                  Get the latest insights delivered to your inbox.
                </h3>

                <div className="flex rounded-xl border border-[#05070D]/10 p-2">
                  <input
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 text-sm outline-none"
                  />
                  <button className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#05070D] text-white">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-[#02060D] p-8 text-white">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1463FF]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/60">
                    Free Resource
                  </span>
                </div>

                <h3 className="mb-5 text-3xl font-black leading-tight">
                  AI Automation Checklist For Business Owners
                </h3>

                <p className="mb-8 text-sm leading-7 text-white/60">
                  A practical checklist to help you identify and automate
                  repetitive tasks in your business.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.12em]"
                >
                  Download Free Checklist
                  <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}