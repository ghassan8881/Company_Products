// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import LogoutButton from "./LogoutButton";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     async function fetchSession() {
//       try {
//         const res = await fetch("/api/session");
//         const data = await res.json();
//         console.log("🚀 ~ fetchSession ~ res:15", res);
//         setSession(data.user);
//       } catch (err) {
//         console.error("Failed to fetch session", err);
//       }
//     }
//     fetchSession();
//   }, []);

//   useEffect(() => {
//     if (session) {
//       console.log("✅ Session loaded:", session);
//     }
//   }, [session]);

//   return (
//     <nav className="border-b">
//       <div className="container mx-auto p-4 flex items-center justify-between">
//         {/* رابط المنتجات دائمًا */}
//         <Link href="/products">المنتجات</Link>

//         {/* زر تسجيل الخروج يظهر فقط إذا فيه session وكنا في /admin */}
//         {pathname === "/admin" && session && <LogoutButton />}
//       </div>
//     </nav>
//   );
// }

import Link from "next/link";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import LogoutButton from "./LogoutButton";

const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: process.env.IRON_SESSION_COOKIE_NAME,
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export default async function Navbar() {
  const session = await getIronSession(cookies(), sessionOptions);
  console.log("🚀 ~ Navbar ~ session:58", session);

  return (
    <nav className="border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        {/* <Link href="/products">المنتجات</Link> */}
        {session?.user && <LogoutButton />}
      </div>
    </nav>
  );
}
