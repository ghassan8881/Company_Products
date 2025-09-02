"use client";

import { useState, useEffect } from "react";

export default function ProductSearch() {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);

  // 🗂️ جلب الفئات من قاعدة البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        console.log("🚀 ~ fetchCategories ~ res:23", res);
        if (res.ok) {
          const data = await res.json();
          console.log("🚀 ~ fetchCategories ~ data:226", data);
          setCategories(data);
        } else {
          setMessage("⚠️ فشل في جلب الفئات");
        }
      } catch (error) {
        console.error(error);
        setMessage("⚠️ خطأ في الاتصال بقاعدة البيانات");
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`/api/products/${parseInt(id)}`);
    if (res.ok) {
      const data = await res.json();
      setProduct(data);
      setEditData({
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId || "",
      });
      setIsEditing(false);
    } else {
      setProduct(null);
      setMessage("❌ المنتج غير موجود");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProduct(null);
      setMessage("✅ تم حذف المنتج");
    } else {
      setMessage("❌ فشل الحذف");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleUpdate ~ editData:73", editData);
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      const updated = await res.json();
      setProduct(updated);
      setMessage("✅ تم تعديل المنتج بنجاح");
      setIsEditing(false);
    } else {
      setMessage("❌ فشل التعديل");
    }
  };

  return (
    <div className="space-y-4">
      {/* 🔎 البحث */}
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ابحث برقم ID"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          بحث
        </button>
      </form>

      {/* 📌 عرض المنتج */}
      {product && (
        <div className="border p-4 rounded bg-gray-50 space-y-2">
          {!isEditing ? (
            <>
              <h2 className="font-bold">{product.name}</h2>
              <p>السعر: {product.price}</p>
              <p>الوصف: {product.description}</p>
              <p>الفئة: {product.categoryId || "غير محدد"}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  تعديل
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  حذف
                </button>
              </div>
            </>
          ) : (
            /* ✏️ تعديل المنتج */
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="border p-2 rounded w-full"
                placeholder="اسم المنتج"
              />
              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                className="border p-2 rounded w-full"
                placeholder="السعر"
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="border p-2 rounded w-full"
                placeholder="الوصف"
              />
              {/* 🏷️ اختيار الفئة من قاعدة البيانات */}
              <select
                value={editData.categoryId}
                onChange={(e) =>
                  setEditData({ ...editData, categoryId: e.target.value })
                }
                className="border p-2 rounded w-full"
              >
                <option value="">اختر الفئة</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
