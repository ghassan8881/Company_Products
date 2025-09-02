"use client";

import { useState } from "react";

export default function CategoryForm({}) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const addCategory = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newCategory = await res.json();
    setCategories([...categories, newCategory]);
    setName("");
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = async (id) => {
    await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, name: editName } : c))
    );
    setEditId(null);
  };

  const deleteCategory = async (id) => {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">الفئات</h2>
      <form onSubmit={addCategory} className="flex space-x-2 mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم الفئة"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          إضافة
        </button>
      </form>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex justify-between items-center p-2 border rounded"
        >
          {editId === cat.id ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border p-1 rounded"
            />
          ) : (
            <span>{cat.name}</span>
          )}

          <div className="space-x-2">
            {editId === cat.id ? (
              <button
                onClick={() => saveEdit(cat.id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                حفظ
              </button>
            ) : (
              <button
                onClick={() => startEdit(cat)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                تعديل
              </button>
            )}
            <button
              onClick={() => deleteCategory(cat.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
