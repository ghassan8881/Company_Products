// "use client";

// import { useState } from "react";
// import ProductForm from "./ProductForm";
// import ProductSearch from "./ProductSearch";

// export default function ProductsTabs({ categories }) {
//   const [activeTab, setActiveTab] = useState("add");

//   return (
//     <div className="space-y-6">
//       <div className="flex space-x-4">
//         <button
//           onClick={() => setActiveTab("add")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           إضافة منتج
//         </button>
//         <button
//           onClick={() => setActiveTab("search")}
//           className={`px-4 py-2 rounded ${
//             activeTab === "search" ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           البحث عن منتج
//         </button>
//       </div>

//       {activeTab === "add" && (
//         <ProductForm categories={JSON.parse(JSON.stringify(categories))} />
//       )}
//       {activeTab === "search" && <ProductSearch />}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import ProductForm from "./ProductForm";
// import ProductSearch from "./ProductSearch";
// import { PlusCircle, Search, ArrowRightCircle } from "lucide-react";

// export default function ProductsTabs({ categories }) {
//   const [activeTab, setActiveTab] = useState("add");

//   return (
//     <div className="space-y-6">
//       {/* شريط علوي ثابت */}
//       <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-md flex items-center justify-between">
//         {/* زر العودة */}
//         <Link
//           href="/admin"
//           className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition"
//         >
//           <ArrowRightCircle size={18} />
//           العودة للوحة التحكم
//         </Link>

//         {/* العنوان في المنتصف */}
//         <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-800">
//           إدارة المنتجات
//         </h2>
//       </div>

//       {/* أزرار التبويبات */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => setActiveTab("add")}
//           className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
//             activeTab === "add"
//               ? "bg-blue-600 text-white shadow"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           <PlusCircle size={18} />
//           إضافة منتج
//         </button>

//         <button
//           onClick={() => setActiveTab("search")}
//           className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
//             activeTab === "search"
//               ? "bg-blue-600 text-white shadow"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           <Search size={18} />
//           البحث عن منتج
//         </button>
//       </div>

//       {/* محتوى التبويبات */}
//       {activeTab === "add" && (
//         <ProductForm categories={JSON.parse(JSON.stringify(categories))} />
//       )}
//       {activeTab === "search" && <ProductSearch />}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import ProductForm from "./ProductForm";
import ProductSearch from "./ProductSearch";
import { PlusCircle, Search, ArrowLeftCircle } from "lucide-react";

export default function ProductsTabs({ categories }) {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="space-y-6" dir="rtl">
      {/* شريط علوي ثابت */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-md flex items-center justify-between">
        {/* زر العودة (يسار في RTL) */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition"
        >
          العودة للوحة التحكم
          <ArrowLeftCircle size={18} />
        </Link>

        {/* العنوان في المنتصف */}
        <h2 className="absolute right-1/2 translate-x-1/2 text-lg font-bold text-gray-800">
          إدارة المنتجات
        </h2>
      </div>

      {/* أزرار التبويبات */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("add")}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
            activeTab === "add"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          إضافة منتج
          <PlusCircle size={18} />
        </button>

        <button
          onClick={() => setActiveTab("search")}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
            activeTab === "search"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          البحث عن منتج
          <Search size={18} />
        </button>
      </div>

      {/* محتوى التبويبات */}
      {activeTab === "add" && (
        <ProductForm categories={JSON.parse(JSON.stringify(categories))} />
      )}
      {activeTab === "search" && <ProductSearch />}
    </div>
  );
}
