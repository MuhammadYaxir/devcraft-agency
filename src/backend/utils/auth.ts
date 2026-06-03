import jwt, { type Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  throw new Error(
    "Critical Configuration Missing: JWT_SECRET environment variable is undefined."
  );
}

export interface AdminJwtPayload {
  email: string;
  role: "admin";
}

export function signAdminToken(payload: AdminJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;

    if (decoded?.email && decoded?.role === "admin") {
      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}