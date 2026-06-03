import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

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
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      decoded &&
      typeof decoded === "object" &&
      "email" in decoded &&
      "role" in decoded &&
      decoded.role === "admin" &&
      typeof decoded.email === "string"
    ) {
      return {
        email: decoded.email,
        role: "admin",
      };
    }

    return null;
  } catch {
    return null;
  }
}