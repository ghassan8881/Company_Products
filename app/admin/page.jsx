import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";


export default  async function AdminPage() {
    const session = await getSession();
  
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <div className="flex space-x-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            المنتجات
          </Link>
          <Link
            href="/admin/categories"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            الفئات
          </Link>
        </div>
      </main>
    </div>
  );
}


