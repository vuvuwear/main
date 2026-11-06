import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

// Read DATABASE_URL from .env.local if not in process.env
let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
  if (match) databaseUrl = match[1];
}

if (!databaseUrl) {
  console.error("Error: DATABASE_URL is not configured.");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  console.log("Connecting to Neon PostgreSQL...");

  // 1. Create tables
  console.log("Creating tables if not exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      details JSONB NOT NULL DEFAULT '[]'::jsonb,
      fabric VARCHAR(255) NOT NULL,
      fit VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      original_price NUMERIC(10, 2),
      category VARCHAR(100) NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      badge VARCHAR(50),
      colors JSONB NOT NULL DEFAULT '[]'::jsonb,
      sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
      images JSONB NOT NULL DEFAULT '[]'::jsonb,
      rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
      review_count INTEGER NOT NULL DEFAULT 0,
      is_featured BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(255) PRIMARY KEY,
      order_number VARCHAR(50) UNIQUE NOT NULL,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(100) NOT NULL,
      shipping_address JSONB NOT NULL,
      items JSONB NOT NULL,
      subtotal NUMERIC(10, 2) NOT NULL,
      shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
      discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
      total NUMERIC(10, 2) NOT NULL,
      payment_method VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  console.log("Tables verified successfully!");

  // Check if products already exist
  const existing = await sql`SELECT COUNT(*)::int as count FROM products;`;
  const count = existing[0]?.count || 0;
  console.log(`Current products in database: ${count}`);

  if (count === 0) {
    console.log("Seeding initial catalog from mock products...");
    // Read mock products
    const mockFilePath = path.resolve("src/data/mockProducts.ts");
    const mockContent = fs.readFileSync(mockFilePath, "utf8");

    // Extract products array using JSON-compatible parsing or import
    // Since mockProducts is TypeScript, let's extract the array
    const jsonMatch = mockContent.substring(
      mockContent.indexOf("["),
      mockContent.lastIndexOf("]") + 1
    );

    // We can evaluate or load mock products
    const productsData = (new Function(`return ${jsonMatch}`))();

    for (const p of productsData) {
      await sql`
        INSERT INTO products (
          id, name, slug, tagline, description, details, fabric, fit,
          price, original_price, category, tags, badge, colors, sizes,
          images, rating, review_count, is_featured
        ) VALUES (
          ${p.id},
          ${p.name},
          ${p.slug},
          ${p.tagline},
          ${p.description},
          ${JSON.stringify(p.details)},
          ${p.fabric},
          ${p.fit},
          ${p.price},
          ${p.originalPrice || null},
          ${p.category},
          ${JSON.stringify(p.tags || [])},
          ${p.badge || null},
          ${JSON.stringify(p.colors || [])},
          ${JSON.stringify(p.sizes || [])},
          ${JSON.stringify(p.images || [])},
          ${p.rating || 5.0},
          ${p.reviewCount || 0},
          ${p.isFeatured || false}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log(`Seeded ${productsData.length} products successfully!`);
  } else {
    console.log("Catalog already populated, skipping seed.");
  }

  console.log("Database initialization finished successfully!");
}

main().catch((err) => {
  console.error("Database initialization failed:", err);
  process.exit(1);
});

