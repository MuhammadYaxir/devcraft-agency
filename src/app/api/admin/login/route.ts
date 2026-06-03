import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signAdminToken } from "@/backend/utils/auth";

type LoginRequestBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Invalid submission payload. Email and password fields are strictly required.",
        },
        { status: 400 }
      );
    }

    const sysAdminEmail = process.env.ADMIN_EMAIL;
    const sysAdminPassword = process.env.ADMIN_PASSWORD;

    if (!sysAdminEmail || !sysAdminPassword) {
      console.error(
        "CRITICAL SERVER ERROR: ADMIN_EMAIL or ADMIN_PASSWORD not configured in .env environment."
      );

      return NextResponse.json(
        {
          error:
            "Authentication system is currently undergoing structural updates.",
        },
        { status: 500 }
      );
    }

    const isValidEmail =
      email.trim().toLowerCase() === sysAdminEmail.trim().toLowerCase();

    const isValidPassword = password === sysAdminPassword;

    if (!isValidEmail || !isValidPassword) {
      return NextResponse.json(
        {
          error:
            "Access denied. Invalid authentication credentials provided.",
        },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      email: sysAdminEmail,
      role: "admin",
    });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Administrative clearance authorized successfully.",
        user: { email: sysAdminEmail, role: "admin" },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Admin Login Pipeline Crash Exception caught:", error);

    return NextResponse.json(
      {
        error:
          "An unhandled server execution failure blocked authorization.",
      },
      { status: 500 }
    );
  }
}