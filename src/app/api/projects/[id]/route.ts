import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import Project from "@/backend/models/Project";
import slugify from "slugify";
import mongoose from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

type ProjectUpdateBody = {
  title?: string;
  slug?: string;
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

function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Syntax Fault: Provided asset id matches no valid format patterns.",
        },
        { status: 400 }
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Entity Clearance Fault: Specified project could not be located.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN GET /api/projects/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "An error occurred while resolving the structural project document.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const body = (await request.json()) as ProjectUpdateBody;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Syntax Fault: Target project index format token validation failed.",
        },
        { status: 400 }
      );
    }

    const currentProject = await Project.findById(id);

    if (!currentProject) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Mutation Exception: Target portfolio entity block does not exist.",
        },
        { status: 404 }
      );
    }

    const { title, description, techStack } = body;

    if (title !== undefined && !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Title cannot evaluate empty.",
        },
        { status: 400 }
      );
    }

    if (description !== undefined && !description.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Fault: Description cannot evaluate empty.",
        },
        { status: 400 }
      );
    }

    if (title && title.trim() !== currentProject.title) {
      const regeneratedSlug = slugify(title, {
        lower: true,
        strict: true,
      });

      const duplicateSlugCheck = await Project.findOne({
        slug: regeneratedSlug,
        _id: { $ne: id },
      });

      if (duplicateSlugCheck) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Conflict Error: Generated semantic routing slug is bound to another node asset.",
          },
          { status: 409 }
        );
      }

      body.slug = regeneratedSlug;
    }

    if (techStack !== undefined) {
      if (Array.isArray(techStack)) {
        body.techStack = techStack;
      } else if (typeof techStack === "string") {
        body.techStack = techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: updatedProject,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN PUT /api/projects/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal mutation subsystem transaction error intercepted.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
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

    const expungedProject = await Project.findByIdAndDelete(id);

    if (!expungedProject) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Purge Error: Target project element is missing or has already been expunged.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Project document expunged cleanly from system clusters.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("CRITICAL ERROR IN DELETE /api/projects/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "System processing failure disrupted structural document removal.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}