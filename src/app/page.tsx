import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductGrid from "@/components/product/ProductGrid";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import LookbookSection from "@/components/home/LookbookSection";
import BestSellers from "@/components/home/BestSellers";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getProducts } from "@/lib/db";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export default async function Home() {
  "use cache";
  const dbProducts = await getProducts();
  const products =
    dbProducts && dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* Editorial Navigation */}
      <Navbar />

      {/* Main Editorial Content */}
      <main className="flex-1">
        {/* 1. Hero Campaign */}
        <HeroBanner />

        {/* 2. Shop by Category */}
        <CategoryShowcase />

        {/* 3. New Arrivals Product Grid with Filters & Sorting */}
        <ProductGrid
          products={products}
          title="New Arrivals"
          eyebrow="Drop 01 // Current Release"
          subtitle="Considered silhouettes engineered with heavyweight combed cotton and relaxed proportions."
          id="products"
        />

        {/* 4. Brand Philosophy: LESS, BUT BETTER. */}
        <BrandPhilosophy />

        {/* 5. Featured Collection / Campaign */}
        <LookbookSection />

        {/* 6. Best Sellers */}
        <BestSellers products={products} />
      </main>

      {/* 7. Newsletter + 8. Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
