import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/backend/utils/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("admin_token");

    // 1. Bounce immediate request if authorization token wrapper is absent
    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json(
        { authorized: false, error: "Access denied. Private execution token missing." },
        { status: 401 }
      );
    }

    // 2. Extract context string and match cryptographical signatures
    const verifiedPayload = verifyAdminToken(tokenCookie.value);

    if (!verifiedPayload) {
      return NextResponse.json(
        { authorized: false, error: "Session expired or authentication signature altered." },
        { status: 401 }
      );
    }

    // 3. Return validated access matrix parameters if validation returns clean
    return NextResponse.json(
      {
        authorized: true,
        user: {
          email: verifiedPayload.email,
          role: verifiedPayload.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin Profile Verification Exception caught:", error);
    return NextResponse.json(
      { error: "A fatal routing processing breakdown disrupted signature validation processing." },
      { status: 500 }
    );
  }
}