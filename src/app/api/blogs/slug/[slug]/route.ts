import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";

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
            "Syntax Fault: Provided routing slug identifier pattern is invalid.",
        },
        { status: 400 }
      );
    }

    const targetedBlog = await Blog.findOne({
      slug: slug.trim(),
      status: "published",
    });

    if (!targetedBlog) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Entity Clearance Fault: Specified published resource could not be located.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: targetedBlog },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL FAILURE IN GET /api/blogs/slug/[slug]:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal cluster read operation exception trapped.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}