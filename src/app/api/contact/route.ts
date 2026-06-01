import { NextResponse } from "next/server";
import { backendContactSchema } from "@/backend/validators/contactSchema";
import { processContactInquiry } from "@/backend/controllers/contactController";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    const validation = backendContactSchema.safeParse(rawBody);

    if (!validation.success) {
      const errorMessages = validation.error.issues
        .map((issue) => issue.message)
        .join(" ");

      return NextResponse.json(
        {
          success: false,
          error: errorMessages,
        },
        { status: 400 }
      );
    }

    const result = await processContactInquiry(validation.data);

    return NextResponse.json(
      {
        success: true,
        message: "Lead sent and saved successfully.",
        id: result?._id?.toString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("❌ CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error occurred.",
        details:
          error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}