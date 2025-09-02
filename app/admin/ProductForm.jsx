// "use client";

// import { useState, useEffect } from "react";

// export default function ProductForm() {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState(""); // ✅ الحقل الجديد
//   const [categoryId, setCategoryId] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // جلب المنتجات
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then(setProducts);

//     // جلب الفئات لاختيارها للمنتج
//     fetch("/api/categories")
//       .then((res) => res.json())
//       .then(setCategories);
//   }, []);

//   const addProduct = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, price, description, categoryId }), // ✅ إضافة الوصف هنا
//     });
//     const newProduct = await res.json();
//     setProducts([...products, newProduct]);
//     setName("");
//     setPrice("");
//     setDescription(""); // ✅ إفراغ الحقل بعد الإضافة
//     setCategoryId("");
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold">المنتجات</h2>
//       <form onSubmit={addProduct} className="flex flex-col space-y-2 mb-4">
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="اسم المنتج"
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="السعر"
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="وصف المنتج"
//           className="border p-2 rounded"
//         />
//         <select
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//           className="border p-2 rounded"
//           required
//         >
//           <option value="">اختر الفئة</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//         <button className="bg-blue-500 text-white px-3 py-2 rounded">
//           إضافة
//         </button>
//       </form>

//       {products.map((prod) => (
//         <div
//           key={prod.id}
//           className="flex flex-col p-3 border rounded mb-2 space-y-1"
//         >
//           <span className="font-semibold">{prod.name} - {prod.price} ريال</span>
//           <span className="text-gray-700">{prod.description}</span> {/* ✅ عرض الوصف */}
//           <span className="text-gray-500">
//             الفئة: {prod.category?.name || "غير محددة"}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";

export default function ProductForm() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState(null); // ✅ ملف الصورة
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);

    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData, // ✅ إرسال multipart/form-data
    });

    const newProduct = await res.json();
    setProducts([...products, newProduct]);

    // إعادة تهيئة الحقول
    setName("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setImageFile(null);
    e.target.reset(); // تفريغ الحقل file
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">المنتجات</h2>
      <form onSubmit={addProduct} className="flex flex-col space-y-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم المنتج"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="السعر"
          className="border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="وصف المنتج"
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">اختر الفئة</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-3 py-2 rounded">
          إضافة
        </button>
      </form>

      {products.map((prod) => (
        <div
          key={prod.id}
          className="flex flex-col p-3 border rounded mb-2 space-y-1"
        >
          {prod.imageUrl && (
            <img
              src={prod.imageUrl}
              alt={prod.name}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <span className="font-semibold">{prod.name} - {prod.price} ريال</span>
          <span className="text-gray-700">{prod.description}</span>
          <span className="text-gray-500">
            الفئة: {prod.category?.name || "غير محددة"}
          </span>
        </div>
      ))}
    </div>
  );
}
