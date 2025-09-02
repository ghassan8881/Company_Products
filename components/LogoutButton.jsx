"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      console.log("🚀 ~ handleLogout ~ res:14", res);
      if (res.ok) {
        // إعادة التوجيه بعد تسجيل الخروج
        router.push("/admin/login");
      } else {
        alert("فشل تسجيل الخروج!");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
    >
      تسجيل الخروج
    </button>
  );
}
