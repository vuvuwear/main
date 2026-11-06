import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductDetailView from "@/components/product/ProductDetailView";
import { getProductBySlug, getProducts } from "@/lib/db";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  let product = await getProductBySlug(slug);

  if (!product) {
    product = MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }

  if (!product) {
    return {
      title: "Product Not Found | VUVU",
    };
  }

  return {
    title: `${product.name} | VUVU Wear`,
    description: product.description,
    openGraph: {
      title: `${product.name} | VUVU`,
      description: product.tagline,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  "use cache";
  const { slug } = await params;
  let product = await getProductBySlug(slug);

  if (!product) {
    product = MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }

  if (!product) {
    notFound();
  }

  // Get related products from DB or fallback
  const allProducts = await getProducts();
  const sourceProducts = allProducts.length > 0 ? allProducts : MOCK_PRODUCTS;
  const relatedProducts = sourceProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
