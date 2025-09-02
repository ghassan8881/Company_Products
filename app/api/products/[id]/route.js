// import { prisma } from "@/lib/prisma";

export async function DELETE(req, { params }) {
  // const { id } = params;
  const id = parseInt(params.id, 10);
  await prisma.product.delete({ where: { id } });
  return new Response(JSON.stringify({ message: "Deleted" }));
}

export async function PUT(req, { params }) {
  // const { id } = params;
  const id = parseInt(params.id, 10);
  const { name, price, description, categoryId } = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId),
    },
  });
  return new Response(JSON.stringify(product));
}

import { prisma } from "@/lib/prisma";

// export async function GET(req, { params }) {
//   // const { id } = params;
//   const id = parseInt(params.id, 10);
//   const product = await prisma.product.findUnique({
//     where: { id },
//     include: { category: true },
//   });
//   if (!product) return new Response("Not found", { status: 404 });
//   return new Response(JSON.stringify(product));
// }

export async function GET(req, { params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { category: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const related = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 8,
  });

  return NextResponse.json({ product, related });
}
