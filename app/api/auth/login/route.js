import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs");
export async function POST(req) {
  const { Username, password } = await req.json();
  console.log(`🚀 ~ POST ~ { username, password } :`, { Username, password });

  // جلب المستخدم من قاعدة البيانات
  const user = await prisma.users.findUnique({
    where: { Username },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // التحقق من كلمة المرور (مشفرة)
  const isValid = await bcrypt.compare(password, user.PasswordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // حفظ الجلسة
  const session = await getSession();
  session.user = { id: user.id, username: user.Username, role: user.Role };
  await session.save();

  return NextResponse.json({ ok: true, user: session.user });
}
