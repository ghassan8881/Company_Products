import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import RelatedProductsSlider from "@/components/RelatedProductsSlider"; // 👈 Client Component

export default async function ProductDetails({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { category: true },
  });

  if (!product) return notFound();

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 8,
  });

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6 space-y-12">
        {/* تفاصيل المنتج */}
        <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6">
          {product.imageUrl && (
            <div className="flex justify-center items-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="rounded-2xl shadow-md max-h-[600px] object-contain w-full"
              />
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold">{product.name}</h1>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-semibold text-green-600">
              السعر: {product.price.toLocaleString()} ل.س
            </p>
            {product.category && (
              <p className="text-sm text-gray-500">
                التصنيف: {product.category.name}
              </p>
            )}
            <div className="pt-6">
              <Link
                href="/products"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl shadow-md transition"
              >
                ← رجوع للمنتجات
              </Link>
            </div>
          </div>
        </div>

        {/* منتجات مشابهة (سلايدر) */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">منتجات مشابهة</h2>
            <RelatedProductsSlider
              products={JSON.parse(JSON.stringify(related))}
            />
          </section>
        )}
      </main>
    </div>
  );
}
