"use client"; // مهم جدًا لتحويل هذا الملف إلى Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = category ? `?category=${category}` : "";
    router.push(`/products${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-4">
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">الكل</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        تصفية
      </button>
    </form>
  );
}
