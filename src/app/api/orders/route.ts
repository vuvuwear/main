import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.customerEmail || !body.items || !body.items.length) {
      return NextResponse.json(
        { error: "Invalid order data. Customer email and items are required." },
        { status: 400 }
      );
    }

    const orderNumber =
      body.orderNumber || `VUVU-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = await createOrder({
      orderNumber,
      customerName: body.customerName || `${body.shippingAddress?.firstName || ""} ${body.shippingAddress?.lastName || ""}`.trim() || "Customer",
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone || body.shippingAddress?.phone || "",
      shippingAddress: body.shippingAddress || {},
      items: body.items,
      subtotal: body.subtotal || 0,
      shippingCost: body.shippingCost || 0,
      discountAmount: body.discountAmount || 0,
      total: body.total || 0,
      paymentMethod: body.paymentMethod || "Credit Card",
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

