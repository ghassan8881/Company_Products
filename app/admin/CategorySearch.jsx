"use client";

import { useState } from "react";

export default function CategorySearch() {
  const [id, setId] = useState("");
  const [category, setCategory] = useState(null);

  const searchCategory = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/categories/${id}`);
    if (res.ok) {
      const data = await res.json();
      console.log("🚀 ~ searchCategory ~ data:14", data);
      setCategory(data);
    } else {
      setCategory(null);
      alert("الفئة غير موجودة");
    }
  };

  const deleteCategory = async (id) => {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setCategory(null);
    alert("تم حذف الفئة");
  };

  return (
    <div>
      <form onSubmit={searchCategory} className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="أدخل رقم ID الفئة"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          بحث
        </button>
      </form>

      {category && (
        <div className="p-4 border rounded space-y-2">
          <h2 className="text-xl font-semibold">{category.name}</h2>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-yellow-400 rounded">تعديل</button>
            <button
              onClick={() => deleteCategory(category.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              حذف
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
