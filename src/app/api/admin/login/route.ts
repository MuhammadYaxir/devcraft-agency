import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signAdminToken } from "@/backend/utils/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Structural Sanity Validations
    if (!email || !password) {
      return NextResponse.json(
        { error: "Invalid submission payload. Email and password fields are strictly required." },
        { status: 400 }
      );
    }

    const sysAdminEmail = process.env.ADMIN_EMAIL;
    const sysAdminPassword = process.env.ADMIN_PASSWORD;

    if (!sysAdminEmail || !sysAdminPassword) {
      console.error("❌ CRITICAL SERVER ERROR: ADMIN_EMAIL or ADMIN_PASSWORD not configured in .env environment.");
      return NextResponse.json(
        { error: "Authentication system is currently undergoing structural updates." },
        { status: 500 }
      );
    }

    // 2. Strict Credential Vector Verification Matching
    if (email.trim().toLowerCase() !== sysAdminEmail.trim().toLowerCase() || password !== sysAdminPassword) {
      return NextResponse.json(
        { error: "Access denied. Invalid authentication credentials provided." },
        { status: 401 }
      );
    }

    // 3. Generate Cryptographic Safe Token Array String
    const token = signAdminToken({
      email: sysAdminEmail,
      role: "admin",
    });

    // 4. Inject Secure Token payload into Cookie Storage Jar
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_token",
      value: token,
      httpOnly: true, // Complete isolation protection from client JavaScript code execution pools (Blocks XSS attacks)
      secure: process.env.NODE_ENV === "production", // Forces HTTPS compilation targets in standard production distributions
      sameSite: "lax", // Solid protection layer buffering against Cross-Site Request Forgery (CSRF tokens)
      path: "/", // Valid token access boundaries mapped right across your entire site routes hierarchy
      maxAge: 60 * 60 * 24 * 7, // Fixed 7 Days mathematical runtime lifecycle
    });

    return NextResponse.json(
      {
        success: true,
        message: "Administrative clearance authorized successfully.",
        user: { email: sysAdminEmail, role: "admin" },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin Login Pipeline Crash Exception caught:", error);
    return NextResponse.json(
      { error: "An unhandled server execution failure blocked authorization." },
      { status: 500 }
    );
  }
}