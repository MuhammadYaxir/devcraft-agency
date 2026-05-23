import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Project from "@/backend/models/Project";
import slugify from "slugify";

/**
 * GET /api/projects
 * Fetches all project records from the database.
 * Supports optional parameters filtering: /api/projects?status=published
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    // Construct query condition metrics
    const queryConditions: Record<string, any> = {};
    if (statusFilter) {
      queryConditions.status = statusFilter;
    }

    // Retrieve documents sorted by newest first
    const projects = await Project.find(queryConditions).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: projects.length, data: projects }, { status: 200 });
  } catch (error: any) {
    console.error("❌ CRITICAL ERROR IN GET /api/projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project database records.", details: error?.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Instantiates and saves a new project node into the system.
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      title,
      description,
      longDescription,
      category,
      featuredImage,
      techStack,
      liveUrl,
      githubUrl,
      status,
      featured,
    } = body;

    // 1. Mandatory Core Integrity Constraints Verification
    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Project title is strictly required." }, { status: 400 });
    }
    if (!description || !description.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Brief project description is required." }, { status: 400 });
    }

    // 2. Generate URI-Safe Unique Slug Index
    const uniqueSlug = slugify(title, { lower: true, strict: true });

    // 3. Prevent Duplicate Slug Collisions
    const existingSlugMatch = await Project.findOne({ slug: uniqueSlug });
    if (existingSlugMatch) {
      return NextResponse.json(
        { success: false, error: "Conflict Error: A project with an identical slug index already exists." },
        { status: 409 }
      );
    }

    // 4. Transform TechStack into Array vector if received as a comma-separated string
    let structuralTechStack: string[] = [];
    if (Array.isArray(techStack)) {
      structuralTechStack = techStack;
    } else if (typeof techStack === "string") {
      structuralTechStack = techStack.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
    }

    // 5. Construct and Save Mongoose Document
    const newProject = await Project.create({
      title: title.trim(),
      slug: uniqueSlug,
      description: description.trim(),
      longDescription: longDescription || "",
      category: category || "Uncategorized",
      featuredImage: featuredImage || "",
      techStack: structuralTechStack,
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      status: status || "draft",
      featured: featured ?? false,
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error: any) {
    console.error("❌ CRITICAL ERROR IN POST /api/projects:", error);
    return NextResponse.json(
      { success: false, error: "Internal server write transaction failure trapped.", details: error?.message },
      { status: 500 }
    );
  }
}