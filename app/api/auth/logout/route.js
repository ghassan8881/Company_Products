import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();
    console.log("🚀 ~ logout ~ session7:", session);

    // نحذف بيانات المستخدم من السيشن
    session.destroy();

    return NextResponse.json({ message: "تم تسجيل الخروج بنجاح" });
  } catch (err) {
    console.error("❌ Error in logout:", err);
    return NextResponse.json({ error: "تعذر تسجيل الخروج" }, { status: 500 });
  }
}
