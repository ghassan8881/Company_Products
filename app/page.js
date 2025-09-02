// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">مرحباً بك 👋</h1>
//       <div className="flex gap-6">
//         <Link
//           href="/products"
//           className="bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600 transition"
//         >
//           🛒 المنتجات
//         </Link>
//         <Link
//           href="/admin"
//           className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-600 transition"
//         >
//           ⚙️ لوحة التحكم
//         </Link>
//       </div>
//     </main>
//   );
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products");
}

