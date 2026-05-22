import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Check for cookie structural existence before execution
    if (!cookieStore.has("admin_token")) {
      return NextResponse.json(
        { message: "No active administrative execution session tracks detected." },
        { status: 200 }
      );
    }

    // Overwrite cookie with immediate past expiration timeline to trigger instantaneous local storage deletion
    cookieStore.set({
      name: "admin_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // Sets expiration to Unix Epoch time (instant obliteration)
    });

    return NextResponse.json(
      { success: true, message: "Administrative authorization track severed safely. Logout complete." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin Logout Pipeline Exception caught:", error);
    return NextResponse.json(
      { error: "Internal process failure disrupted transaction clearing." },
      { status: 500 }
    );
  }
}