import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
  const c = await cookies();
  return getIronSession(c, {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: process.env.IRON_SESSION_COOKIE_NAME,
    cookieOptions: { secure: process.env.IRON_SESSION_SECURE === "true" },
  });
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.user || session.user.role !== "1") return null;
  return session.user;
}
