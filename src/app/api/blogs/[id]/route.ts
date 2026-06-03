import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";
import slugify from "slugify";
import mongoose from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

type BlogUpdateBody = {
  title?: string;
  slug?: string;
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

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Syntax Fault: Provided identifier parameter matches no valid format patterns.",
        },
        { status: 400 }
      );
    }

    const targetedBlog = await Blog.findById(id);

    if (!targetedBlog) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Entity Clearance Fault: Specified record could not be located.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: targetedBlog },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN GET /api/blogs/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "An exception occurred while resolving the structural document index.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const body = (await request.json()) as BlogUpdateBody;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Syntax Fault: Mongoose target index format pattern validation failed.",
        },
        { status: 400 }
      );
    }

    const currentBlogNode = await Blog.findById(id);

    if (!currentBlogNode) {
      return NextResponse.json(
        {
          success: false,
          error: "Mutation Exception: Target entity data block does not exist.",
        },
        { status: 404 }
      );
    }

    const { title, excerpt, content, keywords } = body;

    if (title !== undefined && !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Title string bounds cannot evaluate empty.",
        },
        { status: 400 }
      );
    }

    if (excerpt !== undefined && !excerpt.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Validation Fault: Excerpt block bounds cannot evaluate empty.",
        },
        { status: 400 }
      );
    }

    if (content !== undefined && !content.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Validation Fault: Content payload block cannot evaluate empty.",
        },
        { status: 400 }
      );
    }

    if (title && title.trim() !== currentBlogNode.title) {
      const regeneratedSlug = slugify(title, {
        lower: true,
        strict: true,
      });

      const duplicateSlugCheck = await Blog.findOne({
        slug: regeneratedSlug,
        _id: { $ne: id },
      });

      if (duplicateSlugCheck) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Conflict Error: Regenerated routing slug is allocated to another asset.",
          },
          { status: 409 }
        );
      }

      body.slug = regeneratedSlug;
    }

    if (keywords && !Array.isArray(keywords)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Typing Mismatch: Keywords attribute field must execute strictly array-wrapped.",
        },
        { status: 400 }
      );
    }

    const updatedBlogNode = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, data: updatedBlogNode },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN PUT /api/blogs/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal update mutation system engine exception trapped.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Syntax Fault: Target record validation parameters mismatched.",
        },
        { status: 400 }
      );
    }

    const expungedDocument = await Blog.findByIdAndDelete(id);

    if (!expungedDocument) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Purge Error: Target element asset is missing or has already been expunged.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Asset database entry node expunged seamlessly from system storage clusters.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN DELETE /api/blogs/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "System-level processing failure disrupted document removal processing.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}