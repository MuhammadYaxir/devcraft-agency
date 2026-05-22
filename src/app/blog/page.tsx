"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Layers,
  HelpCircle,
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};

const fallbackImage =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";

function formatDate(date?: string) {
  if (!date) return "Recently Published";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently Published";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch("/api/blogs?status=published", {
          method: "GET",
        });

        const json = await response.json();

        if (response.ok && json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error("Failed to sync public article vectors:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const title = blog.title || "";
    const category = blog.category || "";

    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const featuredBlog = filteredBlogs[0];
  const secondaryBlogs = filteredBlogs.slice(1);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#050816] text-white selection:bg-purple-500/30 selection:text-purple-200 font-sans relative overflow-x-hidden pt-28 pb-20">
        <div className="absolute top-0 right-[-5%] w-[600px] h-[600px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.02] blur-[130px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.04] pb-10">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/[0.05] border border-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Sparkles size={12} />
                <span>Agency Perspectives</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                Engineering{" "}
                <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-white bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>

              <p className="text-sm text-gray-400 leading-relaxed">
                In-depth analyses, technological frameworks, and creative
                strategies cultivated by the YYDevs development matrix.
              </p>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search
                size={16}
                className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
              />

              <input
                type="text"
                placeholder="Search concepts or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 focus:border-purple-500/30 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-600 outline-none backdrop-blur-xl transition-all shadow-inner"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-12">
              <div className="h-96 rounded-3xl bg-white/[0.01] border border-white/[0.03] animate-pulse" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-96 rounded-2xl bg-white/[0.01] border border-white/[0.03] animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : hasError || filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/[0.03] bg-white/[0.005] rounded-3xl p-16 text-center max-w-md mx-auto flex flex-col items-center justify-center space-y-4 backdrop-blur-xl"
            >
              <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-full text-purple-400/60 shadow-[0_0_20px_rgba(147,51,234,0.1)]">
                <HelpCircle size={32} />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200">
                  No Articles Manifested
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  We could not locate any published resources matching your
                  search constraints. Try adjusting your vocabulary parameters.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-14">
              {!searchQuery && featuredBlog && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="group relative bg-white/[0.01] hover:bg-white/[0.015] border border-white/[0.04] hover:border-purple-500/20 rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_60px_-15px_rgba(147,51,234,0.08)]"
                >
                  <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden relative border border-white/5">
                    <Image
                      src={featuredBlog.featuredImage || fallbackImage}
                      alt={featuredBlog.title || "Featured blog"}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.85]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center gap-1">
                          <Layers size={10} />{" "}
                          {featuredBlog.category || "Web Development"}
                        </span>

                        <span className="w-1 h-1 bg-white/10 rounded-full" />

                        <span className="flex items-center gap-1 font-medium">
                          <Calendar size={11} />
                          {formatDate(featuredBlog.createdAt)}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight group-hover:text-purple-400 transition-colors duration-300">
                        {featuredBlog.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-4">
                        {featuredBlog.excerpt}
                      </p>
                    </div>

                    <Link href={`/blog/${featuredBlog.slug}`} className="block">
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.02] hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/20 text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all group/btn"
                      >
                        <span>Read Featured Document</span>
                        <ArrowUpRight
                          size={14}
                          className="text-gray-500 group-hover/btn:text-purple-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all"
                        />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {(searchQuery ? filteredBlogs : secondaryBlogs).map((blog) => (
                  <motion.article
                    key={blog._id}
                    variants={cardVariants}
                    whileHover={{
                      y: -6,
                      borderColor: "rgba(147, 51, 234, 0.2)",
                    }}
                    className="bg-white/[0.01] border border-white/[0.04] rounded-2xl overflow-hidden backdrop-blur-2xl p-4 flex flex-col justify-between h-[460px] group transition-all duration-400 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.05)]"
                  >
                    <div className="space-y-4">
                      <div className="aspect-[16/10] w-full rounded-xl overflow-hidden relative border border-white/5 bg-white/[0.01]">
                        <Image
                          src={blog.featuredImage || fallbackImage}
                          alt={blog.title || "Blog image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500 px-1">
                        <span className="text-purple-400 flex items-center gap-1">
                          <Layers size={10} />{" "}
                          {blog.category || "Web Development"}
                        </span>

                        <span className="flex items-center gap-1 font-medium">
                          <Calendar size={11} />
                          {formatDate(blog.createdAt)}
                        </span>
                      </div>

                      <div className="space-y-2 px-1">
                        <h3 className="font-extrabold text-base leading-snug tracking-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.03] mt-4 px-1">
                      <Link href={`/blog/${blog.slug}`} className="block">
                        <button className="w-full flex items-center justify-between text-xs font-bold tracking-wide py-2 text-gray-300 hover:text-white transition-colors group/btn">
                          <span>Read Full Article</span>

                          <div className="w-7 h-7 rounded-lg bg-white/[0.02] group-hover/btn:bg-purple-500/10 border border-white/5 group-hover/btn:border-purple-500/20 flex items-center justify-center text-gray-500 group-hover/btn:text-purple-400 transition-all duration-300">
                            <ArrowUpRight
                              size={14}
                              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                            />
                          </div>
                        </button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}