import { neon } from "@neondatabase/serverless";
import { Product } from "@/types/product";

// Initialize Neon SQL driver
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("DATABASE_URL is missing in environment variables.");
}

export const sql = neon(databaseUrl || "");

/**
 * Maps a database row from the `products` table to the client-facing `Product` interface.
 */
export function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    description: row.description,
    details: Array.isArray(row.details) ? row.details : [],
    fabric: row.fabric,
    fit: row.fit,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : [],
    badge: row.badge || undefined,
    colors: Array.isArray(row.colors) ? row.colors : [],
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    images: Array.isArray(row.images) ? row.images : [],
    rating: Number(row.rating ?? 5.0),
    reviewCount: Number(row.review_count ?? 0),
    isFeatured: Boolean(row.is_featured),
  };
}

/**
 * Fetch all products, optionally filtered by category or featured status.
 */
export async function getProducts(options?: {
  category?: string;
  isFeatured?: boolean;
}): Promise<Product[]> {
  try {
    let rows: any[] = [];
    if (options?.category && options.category !== "all") {
      rows = await sql`
        SELECT * FROM products
        WHERE category = ${options.category}
        ORDER BY created_at DESC;
      `;
    } else if (options?.isFeatured) {
      rows = await sql`
        SELECT * FROM products
        WHERE is_featured = true
        ORDER BY created_at DESC;
      `;
    } else {
      rows = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC;
      `;
    }

    return rows.map(mapRowToProduct);
  } catch (error) {
    console.error("Error fetching products from database:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const rows = await sql`
      SELECT * FROM products
      WHERE slug = ${slug}
      LIMIT 1;
    `;
    if (!rows || rows.length === 0) return null;
    return mapRowToProduct(rows[0]);
  } catch (error) {
    console.error(`Error fetching product with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Create a new product in the database.
 */
export async function createProduct(product: Partial<Product>): Promise<Product> {
  const id = product.id || `vuvu-${Date.now().toString(36)}`;
  const slug =
    product.slug ||
    product.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    id;

  const rows = await sql`
    INSERT INTO products (
      id, name, slug, tagline, description, details, fabric, fit,
      price, original_price, category, tags, badge, colors, sizes,
      images, rating, review_count, is_featured
    ) VALUES (
      ${id},
      ${product.name || "Untitled Item"},
      ${slug},
      ${product.tagline || ""},
      ${product.description || ""},
      ${JSON.stringify(product.details || [])},
      ${product.fabric || "Premium Combed Cotton"},
      ${product.fit || "Contemporary Oversized Cut"},
      ${product.price || 0},
      ${product.originalPrice || null},
      ${product.category || "tees"},
      ${JSON.stringify(product.tags || [])},
      ${product.badge || null},
      ${JSON.stringify(product.colors || [])},
      ${JSON.stringify(product.sizes || [])},
      ${JSON.stringify(product.images || [])},
      ${product.rating ?? 5.0},
      ${product.reviewCount ?? 0},
      ${product.isFeatured ?? false}
    )
    RETURNING *;
  `;

  return mapRowToProduct(rows[0]);
}

/**
 * Delete a product by its ID.
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await sql`
      DELETE FROM products
      WHERE id = ${id};
    `;
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    return false;
  }
}

export interface DbOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

export function mapRowToOrder(row: any): DbOrder {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    shippingAddress: typeof row.shipping_address === "string" ? JSON.parse(row.shipping_address) : row.shipping_address,
    items: typeof row.items === "string" ? JSON.parse(row.items) : row.items,
    subtotal: Number(row.subtotal),
    shippingCost: Number(row.shipping_cost ?? 0),
    discountAmount: Number(row.discount_amount ?? 0),
    total: Number(row.total),
    paymentMethod: row.payment_method,
    status: row.status,
    createdAt: row.created_at,
  };
}

/**
 * Fetch all orders.
 */
export async function getOrders(): Promise<DbOrder[]> {
  try {
    const rows = await sql`
      SELECT * FROM orders
      ORDER BY created_at DESC;
    `;
    return rows.map(mapRowToOrder);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

/**
 * Create a new order.
 */
export async function createOrder(data: {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
}): Promise<DbOrder> {
  const id = `order-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;

  const rows = await sql`
    INSERT INTO orders (
      id, order_number, customer_name, customer_email, customer_phone,
      shipping_address, items, subtotal, shipping_cost, discount_amount,
      total, payment_method, status
    ) VALUES (
      ${id},
      ${data.orderNumber},
      ${data.customerName},
      ${data.customerEmail},
      ${data.customerPhone},
      ${JSON.stringify(data.shippingAddress)},
      ${JSON.stringify(data.items)},
      ${data.subtotal},
      ${data.shippingCost},
      ${data.discountAmount},
      ${data.total},
      ${data.paymentMethod},
      'PENDING'
    )
    RETURNING *;
  `;

  return mapRowToOrder(rows[0]);
}

/**
 * Update an order's status.
 */
export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  try {
    await sql`
      UPDATE orders
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id};
    `;
    return true;
  } catch (error) {
    console.error(`Error updating order status for ${id}:`, error);
    return false;
  }
}

