"use client";

export default function LoginForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log("🚀 ~ handleSubmit ~ res:", res);
      location.reload();
    } else {
      alert("بيانات خاطئة");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 border p-4 rounded max-w-sm"
    >
      <input
        name="Username"
        placeholder="اسم المستخدم"
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="كلمة المرور"
        className="border p-2 w-full"
      />
      <button className="border px-4 py-2 rounded">دخول</button>
    </form>
  );
}
