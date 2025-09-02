"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCodeComponent from "../../components/QRCode";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [products, setProducts] = useState([]);

  // جلب التصنيفات عند التحميل
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  // جلب المنتجات عند أي تغيير في الفلاتر
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.append(key, filters[key]);
    });

    fetch(`/api/products?${params.toString()}`, { signal })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        {/* بحث متقدم مباشر */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block mb-1">اسم المنتج</label>
            <input
              type="text"
              placeholder="بحث بالاسم"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block mb-1">التصنيف</label>
            <select
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">الكل</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">السعر الأدنى</label>
            <input
              type="number"
              placeholder="0"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block mb-1">السعر الأقصى</label>
            <input
              type="number"
              placeholder="1000"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
              }
            />
          </div>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
            >
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="rounded-lg mb-4 object-cover w-full h-48"
                />
              ) : (
                <div className="bg-gray-200 rounded-lg mb-4 h-48 flex items-center justify-center text-gray-500">
                  لا توجد صورة
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{p.category.name}</p>
              <p className="text-blue-600 font-bold mb-3">
                {p.price.toString()} ل.س
              </p>
              <Link
                href={`/products/${p.id}`}
                className="mt-auto bg-blue-600 text-white text-center py-2 px-3 rounded hover:bg-blue-700 transition"
              >
                تفاصيل
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <QRCodeComponent />
      </div>
    </div>
  );
}
