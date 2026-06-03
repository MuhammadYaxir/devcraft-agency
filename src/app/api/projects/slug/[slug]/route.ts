import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Project from "@/backend/models/Project";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();

    const { slug } = await context.params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Syntax Fault: Provided target route slug parameters evaluate invalid.",
        },
        { status: 400 }
      );
    }

    const publishedProject = await Project.findOne({
      slug: slug.trim(),
      status: "published",
    });

    if (!publishedProject) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Clearance Fault: Specified published project documentation could not be located.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: publishedProject },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN GET /api/projects/slug/[slug]:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal transaction failure during data block lookup operations.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}