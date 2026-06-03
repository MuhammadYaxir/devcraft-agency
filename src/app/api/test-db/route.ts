import { NextResponse } from "next/server";
import dbConnect from "@/backend/config/dbConnect";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function GET() {
  try {
    const client = await dbConnect();

    const db = client.connection.db;

    if (!db) {
      throw new Error("Database connection unavailable.");
    }

    const pingResult = await db.command({ ping: 1 });

    return NextResponse.json(
      {
        status: "online",
        message:
          "🚀 DevCraft Database Engine is successfully connected to MongoDB Atlas!",
        ping: pingResult,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("DATABASE TEST FAILED:", error);

    return NextResponse.json(
      {
        status: "offline",
        error: "Failed to connect to cluster framework.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}