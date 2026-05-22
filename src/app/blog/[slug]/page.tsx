import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Share2 
} from "lucide-react";

// --- Next.js 15/16 Asynchronous Routing Typings ---
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

// --- Reading Time Helper Function ---
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225; 
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// --- Live Server Fetch Operation ---
async function getBlogArticle(slug: string): AppResponse<BlogData | null> {
  try {
    // Calling the dedicated slug lookup route wrapper
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blogs/slug/${slug}`, {
      method: "GET",
      next: { revalidate: 60 }, // Cache and revalidate data clusters every 60 seconds
    });

    if (!response.ok) return null;
    
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Critical markdown ingestion failure:", error);
    return null;
  }
}

// --- Dynamic Metadata Generation (SEO Optima Engine) ---
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogArticle(slug);

  if (!blog) {
    return {
      title: "Article Not Found | DevCraft Agency",
    };
  }

  return {
    title: `${blog.metaTitle || blog.title} | DevCraft Insights`,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.featuredImage || "" }],
    },
  };
}

// --- Primary Page Node Implementation ---
type AppResponse<T> = Promise<T>;

export default async function BlogDetailPage({ params }: PageProps) {
  // Await the asynchronous params mapping object per Next.js 15/16 layout specifications
  const { slug } = await params;
  const blog = await getBlogArticle(slug);

  // Fallback instantly to system 404 handler frames if resource doesn't match datastore maps
  if (!blog) {
    notFound();
  }

  const durationMinutes = calculateReadingTime(blog.content);

  return (
    <main className="min-h-screen bg-[#050816] text-white pt-32 pb-24 px-6 sm:px-8 lg:px-10 relative overflow-x-hidden font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Environmental Blur Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-600/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.015] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        
        {/* Navigation Action Control Bar */}
        <div className="flex items-center justify-between">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-purple-400 tracking-wide transition-colors group outline-none">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back To Matrix</span>
            </button>
          </Link>

          <button className="p-2.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-purple-500/20 text-gray-400 hover:text-purple-400 transition-all outline-none">
            <Share2 size={14} />
          </button>
        </div>

        {/* ========================================================= */}
        {/* ARTICLE HERO METRICS BAR                                  */}
        {/* ========================================================= */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <span className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center gap-1.5">
              <Layers size={11} /> {blog.category}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span className="flex items-center gap-1 font-medium text-indigo-300">
              <Clock size={12} /> {durationMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium italic border-l-2 border-purple-500/30 pl-4 bg-white/[0.003] py-2 rounded-r-xl">
            {blog.excerpt}
          </p>
        </header>

        {/* ========================================================= */}
        {/* FEATURED ASSET THUMBNAIL DISPLAY LAYER                     */}
        {/* ========================================================= */}
        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden relative border border-white/[0.05] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-white/[0.005]">
          <Image
            src={blog.featuredImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600"}
            alt={blog.title}
            fill
            priority
            sizes="(max-w-1200px) 100vw, 1200px"
            className="object-cover brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-40" />
        </div>

        {/* ========================================================= */}
        {/* PREMIUM CONTENT DISPLAY CHASSIS                          */}
        {/* ========================================================= */}
        <article className="bg-white/[0.01] border border-white/[0.04] rounded-3xl p-6 sm:p-10 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
          
          {/* Render content data layer safely. 
              Tip: Swap this node out for standard markdown parsers like `react-markdown` 
              or `compiled-mdx` to parse structural code fragments seamlessly.
          */}
          <div className="prose prose-invert max-w-none prose-sm sm:prose-base
            prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white
            prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/[0.03] prose-h2:pb-2 prose-h2:mt-10 prose-h2:text-purple-300
            prose-h3:text-lg sm:prose-h3:text-xl prose-h3:text-gray-200
            prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-white prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-gray-400
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-gray-400
            prose-li:mb-2
            prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:text-indigo-300 prose-code:font-mono before:prose-code:content-none after:prose-code:content-none
            prose-pre:bg-[#02040b] prose-pre:border prose-pre:border-white/5 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono prose-pre:text-xs prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:italic prose-blockquote:bg-purple-500/[0.02] prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:pl-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-300
          ">
            {blog.content.split('\n').map((paragraph, idx) => {
              // Minimal fallback handling mapping native paragraph blocks elegantly if raw markdown library is missing
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-xl sm:text-2xl font-extrabold text-purple-300 border-b border-white/[0.03] pb-2 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-200 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim() === '') return null;
              return <p key={idx} className="text-gray-400 leading-relaxed mb-5">{paragraph}</p>;
            })}
          </div>

          {/* Article Footer Signoff Grid */}
          <div className="mt-12 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-black">DC</div>
              <span>Written by DevCraft Matrix Architecture Engine</span>
            </div>
            
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[11px] text-gray-400">
              <BookOpen size={12} />
              <span>Reference Framework Master Record</span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}