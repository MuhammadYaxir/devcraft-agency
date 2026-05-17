import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return [
    { id: "ramp-financial" },
    { id: "oryzo-retail" },
    { id: "linear-app" },
    { id: "visit-norway" },
    { id: "loom-video" },
    { id: "framer-web" },
    { id: "stripe-press" },
    { id: "vercel-v0" },
  ];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#050816] text-white px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition mb-10"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-10">
          <span className="text-xs uppercase tracking-[0.3em] text-purple-400">
            Case Study
          </span>

          <h1 className="text-5xl font-bold mt-4 capitalize">
            {id.replace(/-/g, " ")}
          </h1>

          <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
            This is a premium project case study page for{" "}
            {id.replace(/-/g, " ")}.
          </p>
        </div>
      </div>
    </main>
  );
}