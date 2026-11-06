import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true";

    const products = await getProducts({
      category: category === "all" ? undefined : category,
      isFeatured: featured ? true : undefined,
    });

    // If database returned products, return them. Otherwise fall back to mockProducts
    if (products && products.length > 0) {
      return NextResponse.json({ success: true, products });
    }

    return NextResponse.json({ success: true, products: MOCK_PRODUCTS });
  } catch (err: any) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ success: true, products: MOCK_PRODUCTS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Product name and price are required." },
        { status: 400 }
      );
    }

    const created = await createProduct(body);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

