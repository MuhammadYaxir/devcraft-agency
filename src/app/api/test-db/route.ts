import { NextResponse } from "next/server";
import dbConnect from "@/backend/config/dbConnect";

export async function GET() {
  try {
    // 1. Connection pool stream ko trigger karein
    const client = await dbConnect();
    
    // 2. Database select karke ek admin status command bhejain
    const db = client.db("devcraft-agency");
    const pingResult = await db.command({ ping: 1 });

    // Agar control yahan tak agaya, implies connection is 100% active!
    return NextResponse.json({
      status: "online",
      message: "🚀 DevCraft Database Engine is successfully connected to MongoDB Atlas!",
      ping: pingResult
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ DATABASE TEST FAILED:", error);
    
    return NextResponse.json({
      status: "offline",
      error: "Failed to connect to cluster framework.",
      details: error?.message || error
    }, { status: 500 });
  }
}