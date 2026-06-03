import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { notFound } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  Link as LinkIcon,
  Send,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage?: string;
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getImageUrl(image?: string) {
  if (!image || image.trim() === "") {
    return "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600";
  }

  return image;
}

async function getBlogArticle(slug: string): Promise<BlogData | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://devcraft-agency-kappa.vercel.app";

    const response = await fetch(`${baseUrl}/api/blogs/slug/${slug}`, {
      method: "GET",
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Blog fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogArticle(slug);

  if (!blog) {
    return {
      title: "Article Not Found | CraftoDev",
    };
  }

  return {
    title: `${blog.metaTitle || blog.title} | CraftoDev Insights`,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: getImageUrl(blog.featuredImage) }],
    },
  };
}

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    const value = line.trim();

    if (!value) return null;

    if (value.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-10 border-t border-gray-200 pt-8 text-2xl font-black tracking-tight text-black"
        >
          {value.replace("## ", "")}
        </h2>
      );
    }

    if (value.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-8 text-xl font-black tracking-tight text-black"
        >
          {value.replace("### ", "")}
        </h3>
      );
    }

    if (value.startsWith("- ")) {
      return (
        <div key={index} className="mt-3 flex items-start gap-3 text-gray-700">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
          <p className="text-[15px] leading-7">{value.replace("- ", "")}</p>
        </div>
      );
    }

    return (
      <p key={index} className="mt-4 text-[15px] leading-8 text-gray-700">
        {value}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogArticle(slug);

  if (!blog) notFound();

  const durationMinutes = calculateReadingTime(blog.content);

  const tocItems = [
    "The Growing Need For Automation",
    "Where Businesses Lose Time",
    "How AI Automation Helps",
    "Real Results, Real Impact",
    "Final Thoughts",
  ];

  const relatedArticles = [
    "8 Ways AI Can Transform Your Business Operations",
    "SaaS Automation: The Future of Scalable Growth",
    "Workflow Automation Best Practices",
    "AI vs Traditional Automation",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f8fb] pt-16 text-black">
        <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <div className="mb-10 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog" className="text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <span>{blog.title}</span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-wide">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              {blog.category || "AI & Automation"}
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-[-0.05em] md:text-7xl">
              {blog.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
              {blog.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xs font-black text-white">
                  CD
                </div>
                <div>
                  <p className="font-black text-black">CraftoDev Team</p>
                  <p className="text-xs">Digital Strategy</p>
                </div>
              </div>

              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.createdAt)}
              </span>

              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {durationMinutes} min read
              </span>

              <button
                type="button"
                aria-label="Copy article link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative hidden min-h-[360px] lg:block">
            <div className="absolute right-0 top-0 h-[320px] w-[320px] rotate-12 rounded-[44px] bg-gradient-to-br from-slate-100 via-slate-300 to-slate-950 shadow-2xl" />
            <div className="absolute right-44 top-40 h-16 w-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-950 shadow-xl" />
            <div className="absolute bottom-10 left-20 h-7 w-7 rounded-full bg-gradient-to-br from-slate-100 to-slate-400" />
          </div>
        </section>

        <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 px-6 pb-20 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-xl bg-black">
              <Image
                src={getImageUrl(blog.featuredImage)}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            <article className="rounded-xl bg-white p-6 shadow-sm md:p-10">
              {renderContent(blog.content)}

              <h2 className="mt-10 border-t border-gray-200 pt-8 text-2xl font-black">
                Final Thoughts
              </h2>

              <p className="mt-4 text-[15px] leading-8 text-gray-700">
                AI automation is no longer just a future idea. It is now a real
                business advantage for companies that want to save time, reduce
                manual work, and scale faster.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  [Timer, "Save Time"],
                  [Target, "Improve Accuracy"],
                  [TrendingUp, "Grow Faster"],
                  [DollarSign, "Reduce Cost"],
                ].map(([Icon, text]) => {
                  const IconComponent = Icon as React.ElementType;

                  return (
                    <div
                      key={text as string}
                      className="rounded-xl border border-gray-200 bg-[#f7f8fb] p-5 text-center"
                    >
                      <IconComponent className="mx-auto mb-3 h-7 w-7 text-blue-600" />
                      <p className="text-sm font-bold">{text as string}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-xl bg-black p-6 text-white md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-black">
                    Want to build something powerful?
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Let&apos;s create a modern website or automation system for
                    your business.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="rounded-full bg-white px-7 py-4 text-xs font-black uppercase text-black"
                >
                  Book a Free Call
                </Link>
              </div>
            </article>
          </div>

          <aside className="space-y-8">
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-6 text-lg font-black">About the Author</h3>

              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-lg font-black text-white">
                  CD
                </div>

                <div>
                  <h4 className="font-black">CraftoDev Team</h4>
                  <p className="text-sm text-gray-500">Web & AI Experts</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                We help businesses grow with modern websites, AI automation,
                SaaS platforms, and digital systems.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-6 text-lg font-black">Table of Contents</h3>

              <div className="space-y-5">
                {tocItems.map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 text-sm ${
                      index === 0
                        ? "font-bold text-blue-600"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    <Circle className="h-3 w-3" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-6 text-lg font-black">Related Articles</h3>

              <div className="space-y-5">
                {relatedArticles.map((title) => (
                  <div
                    key={title}
                    className="border-b border-gray-100 pb-5 last:border-0"
                  >
                    <h4 className="text-sm font-black leading-5">{title}</h4>
                    <p className="mt-2 text-xs text-gray-500">5 min read</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-black p-8 text-white">
              <div className="mb-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-gray-500">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                Stay Updated
              </div>

              <h3 className="text-2xl font-black leading-tight">
                Get the latest insights delivered to your inbox.
              </h3>

              <div className="mt-6 flex rounded-lg bg-white p-1">
                <input
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 px-4 text-sm text-black outline-none"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex h-11 w-11 items-center justify-center rounded-md bg-black text-white"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </aside>
        </section>

        <footer className="bg-black text-white">
          <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row">
            <p>© 2026 CraftoDev. All rights reserved.</p>
            <p>Privacy Policy · Terms of Service</p>
          </div>
        </footer>
      </main>
    </>
  );
}