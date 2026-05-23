"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [featuredImage, setFeaturedImage] = useState("");
  const [techStack, setTechStack] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [status, setStatus] = useState("published");
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProject = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          longDescription,
          category,
          featuredImage,
          techStack: techStack
            .split(",")
            .map((item) => item.trim()),
          liveUrl,
          githubUrl,
          status,
          featured,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/admin/projects");
      } else {
        alert(data.error || "Failed to create project");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/5 rounded-3xl p-8">
        <h1 className="text-3xl font-black mb-8">
          Create New Project
        </h1>

        <form
          onSubmit={handleCreateProject}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
            required
          />

          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none h-28"
            required
          />

          <textarea
            placeholder="Long Description"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none h-40"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Featured Image URL"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Live URL"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="GitHub URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#0b1023] border border-white/10 rounded-xl px-4 py-3 outline-none"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Project
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl font-bold"
          >
            {isLoading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}