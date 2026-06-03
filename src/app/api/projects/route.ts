import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Project from "@/backend/models/Project";
import slugify from "slugify";

type ProjectCreateBody = {
  title?: string;
  description?: string;
  longDescription?: string;
  category?: string;
  featuredImage?: string;
  techStack?: string[] | string;
  liveUrl?: string;
  githubUrl?: string;
  status?: string;
  featured?: boolean;
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

    const projects = await Project.find(queryConditions).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { success: true, count: projects.length, data: projects },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN GET /api/projects:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch project database records.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = (await request.json()) as ProjectCreateBody;

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

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Project title is strictly required.",
        },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Brief project description is required.",
        },
        { status: 400 }
      );
    }

    const uniqueSlug = slugify(title, { lower: true, strict: true });

    const existingSlugMatch = await Project.findOne({ slug: uniqueSlug });

    if (existingSlugMatch) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Conflict Error: A project with an identical slug index already exists.",
        },
        { status: 409 }
      );
    }

    let structuralTechStack: string[] = [];

    if (Array.isArray(techStack)) {
      structuralTechStack = techStack;
    } else if (typeof techStack === "string") {
      structuralTechStack = techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

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

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN POST /api/projects:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server write transaction failure trapped.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}