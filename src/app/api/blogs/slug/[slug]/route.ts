import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/blogs/slug/[slug]
 * Locates an individual published blog post by its URI slug index.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // 1. Establish structural database pool connectivity
    await dbConnect();

    // 2. Safely resolve the asynchronous route parameter mapping
    const { slug } = await context.params;

    // Boundary protection: check if parameter string evaluation holds content
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, error: "Syntax Fault: Provided routing slug identifier pattern is invalid." },
        { status: 400 }
      );
    }

    // 3. Query the data layer with tight indexing constraints
    // This filters strictly for matches that are fully deployed ('published')
    const targetedBlog = await Blog.findOne({
      slug: slug.trim(),
      status: "published",
    });

    // 4. Return explicit 404 block structure if entity matching drops out
    if (!targetedBlog) {
      return NextResponse.json(
        { success: false, error: "Entity Clearance Fault: Specified published resource could not be located." },
        { status: 404 }
      );
    }

    // 5. Package and return verified clean data payload
    return NextResponse.json(
      { success: true, data: targetedBlog }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error(`❌ CRITICAL FAILURE IN GET /api/blogs/slug/[slug]:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal cluster read operation exception trapped.", 
        details: error?.message 
      },
      { status: 500 }
    );
  }
}