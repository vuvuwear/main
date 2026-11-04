import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductGrid from "@/components/product/ProductGrid";
import LookbookSection from "@/components/home/LookbookSection";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroBanner />
        <CategoryShowcase />
        <ProductGrid products={MOCK_PRODUCTS} />
        <LookbookSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
