// "use client";

// import { useState } from "react";
// import CategoryForm from "../CategoryForm";
// import CategorySearch from "../CategorySearch";
// import Link from "next/link";
// import { PlusCircle, Search, ArrowLeftCircle } from "lucide-react";


// export default function CategoriesPage() {
//   const [activeTab, setActiveTab] = useState("add");

//   return (
//     <div className="space-y-6" dir="rtl">
//       <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-md flex items-center justify-between">
//         {/* زر العودة (يسار في RTL) */}
//         <Link
//           href="/admin"
//           className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition"
//         >
//           العودة للوحة التحكم
//           <ArrowLeftCircle size={18} />
//         </Link>

//         {/* العنوان في المنتصف */}
//         <h2 className="absolute right-1/2 translate-x-1/2 text-lg font-bold text-gray-800">
//         إدارة الفئات</h2>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={() => setActiveTab("add")}
//           className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
//             activeTab === "add"               ? "bg-blue-600 text-white shadow"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"

//           }`}
//         >
//           إضافة فئة
//         </button>
//         <button
//           onClick={() => setActiveTab("search")}
//           className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
//             activeTab === "search" ? "bg-green-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           البحث عن فئة
//         </button>
//       </div>

//       {activeTab === "add" && <CategoryForm />}
//       {activeTab === "search" && <CategorySearch />}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import CategoryForm from "../CategoryForm";
import CategorySearch from "../CategorySearch";
import Link from "next/link";
import { PlusCircle, Search, ArrowLeftCircle } from "lucide-react";

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4" dir="rtl">
      {/* شريط علوي ثابت */}
      <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-md flex items-center justify-between">
        {/* زر العودة */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition"
        >
          العودة للوحة التحكم
          <ArrowLeftCircle size={18} />
        </Link>

        {/* العنوان */}
        <h2 className="text-lg font-bold text-gray-800 text-center flex-1">
          إدارة الفئات
        </h2>
      </div>

      {/* أزرار التبويبات */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => setActiveTab("add")}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition ${
            activeTab === "add"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          إضافة فئة
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
          البحث عن فئة
          <Search size={18} />
        </button>
      </div>

      {/* محتوى التبويبات */}
      {activeTab === "add" && <CategoryForm />}
      {activeTab === "search" && <CategorySearch />}
    </div>
  );
}
