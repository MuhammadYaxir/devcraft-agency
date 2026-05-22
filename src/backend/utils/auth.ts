import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Critical Configuration Missing: JWT_SECRET environment variable is undefined.");
}

export interface AdminJwtPayload {
  email: string;
  role: "admin";
}

/**
 * Encrypts user identity into a signed, tamper-proof JSON Web Token.
 */
export function signAdminToken(payload: AdminJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

/**
 * Decrypts and structural-verifies an incoming authorization string token against the system secret.
 * Returns the verified payload structure or null if invalid/expired.
 */
export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    
    // Explicit runtime type check validation guard
    if (decoded && typeof decoded === "object" && decoded.role === "admin" && "email" in decoded) {
      return decoded as AdminJwtPayload;
    }
    
    return null;
  } catch (error) {
    // Gracefully catch expiration errors or malicious token modifications
    return null;
  }
}