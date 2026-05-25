"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  ImageIcon,
  Layers,
  Link2,
  FileText,
  Star,
} from "lucide-react";

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage: string;
  technologies: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    slug: "",
    description: "",
    category: "",
    featuredImage: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    status: "published",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        const data = await response.json();

        if (data.success) {
          const project = data.data;

          setFormData({
            title: project.title || "",
            slug: project.slug || "",
            description: project.description || "",
            category: project.category || "",
            featuredImage: project.featuredImage || "",
            technologies: project.technologies?.join(", ") || "",
            liveUrl: project.liveUrl || "",
            githubUrl: project.githubUrl || "",
            featured: project.featured || false,
            status: project.status || "published",
          });
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch project.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleUpdateProject = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies
            .split(",")
            .map((tech) => tech.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Project updated successfully!");

      router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to update project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">
              Edit{" "}
              <span className="text-purple-400">Project</span>
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Update your portfolio project details.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <form
          onSubmit={handleUpdateProject}
          className="space-y-6 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Project Title
              </label>

              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-4 top-4 text-gray-500"
                />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Category
              </label>

              <div className="relative">
                <Layers
                  size={16}
                  className="absolute left-4 top-4 text-gray-500"
                />

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Featured Image URL
              </label>

              <div className="relative">
                <ImageIcon
                  size={16}
                  className="absolute left-4 top-4 text-gray-500"
                />

                <input
                  type="text"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Live URL
              </label>

              <div className="relative">
                <Link2
                  size={16}
                  className="absolute left-4 top-4 text-gray-500"
                />

                <input
                  type="text"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                GitHub URL
              </label>

              <input
                type="text"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-300">
                Technologies
              </label>

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Next.js, TypeScript, MongoDB"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-gray-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Star size={14} />
                Featured Project
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Updating Project...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}