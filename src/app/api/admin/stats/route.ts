import { NextResponse } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";
import Project from "@/backend/models/Project";

export async function GET() {
  try {
    await dbConnect();

    const [
      totalBlogs,
      totalProjects,
      publishedPosts,
      draftPosts,
      publishedProjects,
      draftProjects,
    ] = await Promise.all([
      Blog.countDocuments(),
      Project.countDocuments(),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Project.countDocuments({ status: "published" }),
      Project.countDocuments({ status: "draft" }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalBlogs,
        totalProjects,
        publishedPosts,
        draftPosts,
        publishedProjects,
        draftProjects,
      },
    });
  } catch (error) {
    console.error("ADMIN_STATS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admin stats",
      },
      { status: 500 }
    );
  }
}