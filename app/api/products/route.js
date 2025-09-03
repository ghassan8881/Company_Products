import { prisma } from "@/lib/prisma";
// import { number } from "zod";
// import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// export async function GET() {
//   const products = await prisma.product.findMany({
//     include: { category: true },
//   });
//   return new Response(JSON.stringify(products));
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name") || "";
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const where = {
    AND: [
      name ? { name: { contains: name } } : {},
      category ? { categoryId: parseInt(category) } : {},
      ...(minPrice ? [{ price: { gte: parseFloat(minPrice) } }] : []),
      ...(maxPrice ? [{ price: { lte: parseFloat(maxPrice) } }] : []),
    ],
  };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(products), { status: 200 });
}

// منع Next.js من التعامل تلقائياً مع body
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function parseForm(req) {
//   const form = formidable({
//     uploadDir: path.join(process.cwd(), "/public/uploads"),
//     keepExtensions: true,
//     multiples: false,
//   });

//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name");
//     const price = formData.get("price");
//     const description = formData.get("description");
//     const categoryId = formData.get("categoryId");
//     const image = formData.get("image"); // نوعه File

//     let imageUrl = null;

//     if (image) {
//       const bytes = await image.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       await fs.mkdir(uploadDir, { recursive: true });

//       const fileName = `${Date.now()}-${image.name}`;
//       const filePath = path.join(uploadDir, fileName);

//       // ✅ هذا يعمل بدون cb
//       await fs.writeFile(filePath, buffer);

//       imageUrl = `/uploads/${fileName}`;
//     }

//     // function slugify(str) {
//     //   return str
//     //     .toLowerCase()
//     //     .trim()
//     //     .replace(/[\s\W-]+/g, "-");
//     // }

//     const product = await prisma.product.create({
//       data: {
//         name,
//         price: parseFloat(price),
//         description,
//         categoryId: parseInt(categoryId),
//         // slug: slugify(name),
//         imageUrl,
//       },
//     });

//     return NextResponse.json(product, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to create product" },
//       { status: 500 }
//     );
//   }
// }

import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const categoryId = formData.get("categoryId");
    const image = formData.get("image");

    let imageUrl = null;

    if (image) {
      // تكوين Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // تحويل الصورة إلى buffer
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // رفع الصورة إلى Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        categoryId: parseInt(categoryId),
        imageUrl,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
