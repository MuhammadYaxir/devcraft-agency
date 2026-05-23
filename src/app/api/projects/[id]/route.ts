import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Project from "@/backend/models/Project";
import slugify from "slugify";
import mongoose from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/projects/[id]
 * Locates an individual dynamic portfolio document by its system hexadecimal identifier.
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;

    // Validate structural integrity of incoming ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Syntax Fault: Provided asset id matches no valid format patterns." }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: "Entity Clearance Fault: Specified project could not be located." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ CRITICAL ERROR IN GET /api/projects/[id]:`, error);
    return NextResponse.json(
      { success: false, error: "An error occurred while resolving the structural project document.", details: error?.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/[id]
 * Mutates properties and structures on an existing portfolio document item node.
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Syntax Fault: Target project index format token validation failed." }, { status: 400 });
    }

    // Verify existing record context prior to applying modifications
    const currentProject = await Project.findById(id);
    if (!currentProject) {
      return NextResponse.json({ success: false, error: "Mutation Exception: Target portfolio entity block does not exist." }, { status: 404 });
    }

    const { title, description, techStack } = body;

    // Sanity boundary check adjustments
    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Title cannot evaluate empty." }, { status: 400 });
    }
    if (description !== undefined && !description.trim()) {
      return NextResponse.json({ success: false, error: "Validation Fault: Description cannot evaluate empty." }, { status: 400 });
    }

    // Regenerate unique semantic slug indices if the system project title alters states
    if (title && title.trim() !== currentProject.title) {
      const regeneratedSlug = slugify(title, { lower: true, strict: true });
      
      // Arm collision guards to lock out duplicate entries
      const duplicateSlugCheck = await Project.findOne({ slug: regeneratedSlug, _id: { $ne: id } });
      if (duplicateSlugCheck) {
        return NextResponse.json({ success: false, error: "Conflict Error: Generated semantic routing slug is bound to another node asset." }, { status: 409 });
      }
      body.slug = regeneratedSlug;
    }

    // Process TechStack structure adjustments if present
    if (techStack !== undefined) {
      if (Array.isArray(techStack)) {
        body.techStack = techStack;
      } else if (typeof techStack === "string") {
        body.techStack = techStack.split(",").map((i) => i.trim()).filter((i) => i.length > 0);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ CRITICAL ERROR IN PUT /api/projects/[id]:`, error);
    return NextResponse.json(
      { success: false, error: "Internal mutation subsystem transaction error intercepted.", details: error?.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id]
 * Permanently removes a portfolio node element from system records.
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    await dbConnect();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Syntax Fault: Provided identifier parameter matches no valid format patterns." }, { status: 400 });
    }

    const expungedProject = await Project.findByIdAndDelete(id);
    if (!expungedProject) {
      return NextResponse.json({ success: false, error: "Purge Error: Target project element is missing or has already been expunged." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project document expunged cleanly from system clusters." }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ CRITICAL ERROR IN DELETE /api/projects/[id]:`, error);
    return NextResponse.json(
      { success: false, error: "System processing failure disrupted structural document removal.", details: error?.message },
      { status: 500 }
    );
  }
}