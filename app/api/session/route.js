import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: "company_products_session",
  // cookieOptions: {
  //   secure: process.env.NODE_ENV === "production",
  // },
};

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);
  return Response.json({ user: session.user || null });
}
