import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";
import slugify from "slugify";

/**
 * GET /api/blogs
 * Fetches all blog posts from the datastore.
 * Supports optional parameter sorting: /api/blogs?status=published
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Extract search query metrics from the request URL
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    // Construct highly performant filter query objects
    const queryConditions: Record<string, any> = {};
    if (statusFilter) {
      queryConditions.status = statusFilter;
    }

    // Retrieve documents sorted in descending order (newest posts first)
    const blogs = await Blog.find(queryConditions).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: blogs.length, data: blogs }, { status: 200 });
  } catch (error: any) {
    console.error("❌ CRITICAL ERROR IN GET /api/blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch database records.", details: error?.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blogs
 * Assembles and registers a new blog entity inside the datastore clusters.
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

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

    // 1. Core Mandatory Field Sanity Constraints Verification
    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Title string is strictly required." }, { status: 400 });
    }
    if (!excerpt || !excerpt.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Excerpt metadata parameter is required." }, { status: 400 });
    }
    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Main content schema payload is missing." }, { status: 400 });
    }

    // 2. Generate URI-Safe Cryptographic Custom Slug Array String
    const uniqueSlug = slugify(title, { lower: true, strict: true });

    // 3. Prevent duplicate slug index entries crashing core collection tables
    const existingSlugMatch = await Blog.findOne({ slug: uniqueSlug });
    if (existingSlugMatch) {
      return NextResponse.json(
        { success: false, error: "Conflict Error: A record with an identical semantic slug string index already exists." },
        { status: 409 }
      );
    }

    // 4. Construct and Commit New Mongoose Schema Object
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

    return NextResponse.json({ success: true, data: newBlogNode }, { status: 201 });
  } catch (error) {
  console.error("BLOG_CREATE_ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: "Server structural write transaction anomaly intercepted execution.",
      details: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
}