import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";
import slugify from "slugify";

type BlogCreateBody = {
  title?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  status?: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    const queryConditions: Record<string, string> = {};

    if (statusFilter) {
      queryConditions.status = statusFilter;
    }

    const blogs = await Blog.find(queryConditions).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, count: blogs.length, data: blogs },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN GET /api/blogs:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch database records.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = (await request.json()) as BlogCreateBody;

    const {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      metaTitle,
      metaDescription,
      keywords,
      status,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Title string is strictly required.",
        },
        { status: 400 }
      );
    }

    if (!excerpt?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Excerpt metadata parameter is required.",
        },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Main content schema payload is missing.",
        },
        { status: 400 }
      );
    }

    const uniqueSlug = slugify(title, { lower: true, strict: true });

    const existingSlugMatch = await Blog.findOne({ slug: uniqueSlug });

    if (existingSlugMatch) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Conflict Error: A record with an identical semantic slug string index already exists.",
        },
        { status: 409 }
      );
    }

    const newBlogNode = await Blog.create({
      title: title.trim(),
      slug: uniqueSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      featuredImage: featuredImage || "",
      category: category || "Uncategorized",
      metaTitle: metaTitle || title.trim(),
      metaDescription: metaDescription || excerpt.trim(),
      keywords: Array.isArray(keywords) ? keywords : [],
      status: status || "draft",
    });

    return NextResponse.json(
      { success: true, data: newBlogNode },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("BLOG_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Server structural write transaction anomaly intercepted execution.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}