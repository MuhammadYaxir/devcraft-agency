import { NextResponse } from "next/server";
import { backendContactSchema } from "../../../backend/validators/contactSchema";
import { processContactInquiry } from "../../../backend/controllers/contactController";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // Validate inputs
    const validation = backendContactSchema.safeParse(rawBody);

    if (!validation.success) {
      const errorMessages = validation.error.issues.map((issue) => issue.message).join(" ");
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    // Process using decoupled controller logic
    const result = await processContactInquiry(validation.data);

    return NextResponse.json(
      { 
        message: "Lead processed securely and saved to MongoDB.",
        id: result?.insertedId 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ CRITICAL SERVER ERROR DETAILS:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error occurred.",
        details: error?.message || error
      },
      { status: 500 }
    );
  }
}