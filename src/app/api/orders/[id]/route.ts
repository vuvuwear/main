import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id || !body.status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const success = await updateOrderStatus(id, body.status);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to update order status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id, status: body.status });
  } catch (err: any) {
    console.error("PATCH /api/orders/[id] error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}

