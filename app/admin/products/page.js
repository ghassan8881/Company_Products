import { prisma } from "@/lib/prisma";
import ProductsTabs from "@/app/admin/ProductsTabs";

export default async function ProductsPage() {
  // جلب الفئات من قاعدة البيانات
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  return (
    <main className="container mx-auto p-6 space-y-6">
      {/* <h1 className="text-2xl font-bold">إدارة المنتجات</h1> */}
      <ProductsTabs categories={categories} />
    </main>
  );
}
