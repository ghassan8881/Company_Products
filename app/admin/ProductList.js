"use client";

import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "" });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const startEdit = (product) => {
    setEditProductId(product.id);
    setEditData({ name: product.name, price: product.price });
  };

  const saveEdit = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setProducts(products.map((p) => (p.id === id ? { ...p, ...editData } : p)));
    setEditProductId(null);
  };

  const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">المنتجات</h2>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center p-2 border rounded"
        >
          {editProductId === product.id ? (
            <div className="flex space-x-2">
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="border p-1 rounded"
              />
              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                className="border p-1 rounded"
              />
            </div>
          ) : (
            <div>
              <h3>{product.name}</h3>
              <p>الفئة: {product.category?.name}</p>
              <p>السعر: {product.price}</p>
            </div>
          )}

          <div className="space-x-2">
            {editProductId === product.id ? (
              <button
                onClick={() => saveEdit(product.id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                حفظ
              </button>
            ) : (
              <button
                onClick={() => startEdit(product)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                تعديل
              </button>
            )}
            <button
              onClick={() => deleteProduct(product.id)}
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
