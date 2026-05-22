import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Blog from "@/backend/models/Blog";
import slugify from "slugify";
import mongoose from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/blogs/[id]
 * Locates an individual distinct document by its native system hexadecimal identifier.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;

    // Validate if the input matches a structural BSON ObjectId vector format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Syntax Fault: Provided identifier parameter matches no valid format patterns." }, { status: 400 });
    }

    const targetedBlog = await Blog.findById(id);
    if (!targetedBlog) {
      return NextResponse.json({ success: false, error: "Entity Clearance Fault: Specified record could not be located." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: targetedBlog }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ CRITICAL ERROR IN GET /api/blogs/[id]:`, error);
    return NextResponse.json(
      { success: false, error: "An exception occurred while resolving the structural document index.", details: error?.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blogs/[id]
 * Alters parameters and mutates structural arrays on an existing node database block.
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Syntax Fault: Mongoose target index format pattern validation failed." }, { status: 400 });
    }

    // Retrieve active target to match current fields against incoming state changes
    const currentBlogNode = await Blog.findById(id);
    if (!currentBlogNode) {
      return NextResponse.json({ success: false, error: "Mutation Exception: Target entity data block does not exist." }, { status: 404 });
    }

    const { title, excerpt, content, keywords } = body;

    // Re-verify payload boundaries if parameters exist within payload data
    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Title string bounds cannot evaluate empty." }, { status: 400 });
    }
    if (excerpt !== undefined && !excerpt.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Excerpt block bounds cannot evaluate empty." }, { status: 400 });
    }
    if (content !== undefined && !content.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Content payload block cannot evaluate empty." }, { status: 400 });
    }

    // If the semantic title changed, calculate a clean routing slug match index
    if (title && title.trim() !== currentBlogNode.title) {
      const regeneratedSlug = slugify(title, { lower: true, strict: true });
      
      // Prevent collisions across distinct system documents
      const duplicateSlugCheck = await Blog.findOne({ slug: regeneratedSlug, _id: { $ne: id } });
      if (duplicateSlugCheck) {
        return NextResponse.json({ success: false, error: "Conflict Error: Regenerated routing slug is allocated to another asset." }, { status: 409 });
      }
      body.slug = regeneratedSlug;
    }

    // Ensure keywords parsing maintains strict array typing structures
    if (keywords && !Array.isArray(keywords)) {
      return NextResponse.json({ success: false, error: "Typing Mismatch: Keywords attribute field must execute strictly array-wrapped." }, { status: 400 });
    }

    // Execute safe database mutation updates returning altered target structures
    const updatedBlogNode = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: updatedBlogNode }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ CRITICAL ERROR IN PUT /api/blogs/[id]:`, error);
    return NextResponse.json(
      { success: false, error: "Internal update mutation system engine exception trapped.", details: error?.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blogs/[id]
 * Expunges an object asset node systematically from database table clusters.
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Syntax Fault: Target record validation parameters mismatched." }, { status: 400 });
    }

    const expungedDocument = await Blog.findByIdAndDelete(id);
    if (!expungedDocument) {
      return NextResponse.json({ success: false, error: "Purge Error: Target element asset is missing or has already been expunged." }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Asset database entry node expunged seamlessly from system storage clusters." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`❌ CRITICAL ERROR IN DELETE /api/blogs/[id]:`, error);
    return NextResponse.json(
      { success: false, error: "System-level processing failure disrupted document removal processing.", details: error?.message },
      { status: 500 }
    );
  }
}