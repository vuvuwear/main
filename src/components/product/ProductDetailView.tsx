"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Check,
  X,
  Layers,
} from "lucide-react";
import { Product, ProductSize } from "@/types/product";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import ProductCard from "./ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"fabric" | "fit" | "care" | "shipping">("fabric");
  const [isAdded, setIsAdded] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, activeColor.name, activeColor.hex, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-gray-100 bg-[#F1F9FE]/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500 font-mono">
          <Link href="/" className="hover:text-black transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href={`/#${product.category}`}
            className="hover:text-black uppercase transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-black font-semibold truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0 rounded-md overflow-hidden bg-[#F1F9FE] border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#315074] shadow-sm scale-102"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-[#F1F9FE] border border-gray-100 shadow-sm">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-300"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-bold tracking-widest uppercase rounded shadow-xs ${
                      product.badge === "NEW DROP"
                        ? "bg-[#315074] text-white"
                        : product.badge === "BESTSELLER"
                        ? "bg-black text-white"
                        : "bg-amber-600 text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 hover:text-rose-600 shadow-md transition-colors"
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    inWishlist ? "fill-rose-600 text-rose-600" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Product Purchasing & Specs (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono font-bold text-black ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-xs text-gray-500 underline font-mono">
                  {product.reviewCount} Verified Reviews
                </span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-[11px] font-mono text-[#315074] font-bold">
                  IN STOCK
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-[#315074] font-medium tracking-wide mt-1">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-black font-mono text-black">
                  ${product.price}.00
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm font-mono text-gray-400 line-through">
                      ${product.originalPrice}.00
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono">
                      SAVE {discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 my-6" />

            {/* Color Swatches */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-bold uppercase tracking-wider text-black">
                  Colorway:
                </span>
                <span className="font-semibold text-[#315074]">
                  {activeColor.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`relative p-0.5 rounded-full transition-all ${
                      selectedColorIndex === idx
                        ? "ring-2 ring-offset-2 ring-[#315074] scale-110"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-gray-300 block shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-bold uppercase tracking-wider text-black">
                  Select Size:
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-[#315074] hover:text-black font-semibold transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 text-xs font-mono font-bold rounded border text-center transition-all ${
                      !s.inStock
                        ? "text-gray-300 bg-gray-50 border-gray-100 cursor-not-allowed line-through"
                        : selectedSize === s.size
                        ? "bg-[#315074] text-white border-[#315074] shadow-sm"
                        : "bg-white text-black border-gray-200 hover:border-[#315074] hover:bg-[#F1F9FE]"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="mt-8 flex gap-3">
              {/* Quantity input */}
              <div className="flex items-center border border-gray-200 rounded px-2 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                  isAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-[#000000] hover:bg-[#315074] text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Fast Delivery & Trust Highlights */}
            <div className="mt-6 p-4 rounded-lg bg-[#F1F9FE] border border-[#315074]/15 space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#315074] flex-shrink-0" />
                <span>
                  <strong>Complimentary Shipping</strong> on all orders over $100.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#315074] flex-shrink-0" />
                <span>
                  <strong>30-Day Hassle-Free Returns</strong> with pre-paid return labels.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#315074] flex-shrink-0" />
                <span>
                  <strong>Guaranteed Longevity</strong> — Pre-shrunk 100% Egyptian cotton.
                </span>
              </div>
            </div>

            {/* Garment Specifications Tabs */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative mr-6 ${
                    activeTab === "fabric"
                      ? "text-[#315074]"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  Fabric & GSM
                  {activeTab === "fabric" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#315074]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("fit")}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative mr-6 ${
                    activeTab === "fit"
                      ? "text-[#315074]"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  Silhouette & Cut
                  {activeTab === "fit" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#315074]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors relative mr-6 ${
                    activeTab === "care"
                      ? "text-[#315074]"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  Garment Care
                  {activeTab === "care" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#315074]" />
                  )}
                </button>
              </div>

              <div className="py-4 text-xs text-gray-600 leading-relaxed">
                {activeTab === "fabric" && (
                  <div className="space-y-2">
                    <p className="font-semibold text-black">{product.fabric}</p>
                    <ul className="list-disc pl-4 space-y-1 text-gray-500">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "fit" && (
                  <div>
                    <p className="font-semibold text-black mb-1">{product.fit}</p>
                    <p className="text-gray-500">
                      Engineered with a contemporary drop shoulder and generous chest volume. Designed to drape without clinging. If you prefer a tailored/slim profile, we suggest sizing down one size.
                    </p>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-1.5 text-gray-500">
                    <p>• Machine wash cold (30°C / 85°F) with like colors.</p>
                    <p>• Wash and iron garment inside out to preserve cotton pile.</p>
                    <p>• Hang dry in shade recommended; do not tumble dry.</p>
                    <p>• Do not bleach or use chlorine-based chemicals.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#315074]">
                  CURATED STYLING
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-1">
                  Complete The Silhouette
                </h3>
              </div>
              <Link
                href="/#products"
                className="text-xs font-bold uppercase tracking-wider text-[#315074] hover:underline"
              >
                View Full Wardrobe
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-white text-black max-w-lg w-full rounded-xl p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#315074]" />
                <h3 className="text-base font-bold uppercase tracking-wider">
                  VUVU Measurement Guide
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Measurements taken flat in centimeters (cm):
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F1F9FE] text-[#315074] uppercase font-mono font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest (Width)</th>
                    <th className="py-2.5 px-3">Length</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-bold">S</td>
                    <td className="py-2.5 px-3">58 cm</td>
                    <td className="py-2.5 px-3">71 cm</td>
                    <td className="py-2.5 px-3">55 cm</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold">M</td>
                    <td className="py-2.5 px-3">61 cm</td>
                    <td className="py-2.5 px-3">73 cm</td>
                    <td className="py-2.5 px-3">57 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">L</td>
                    <td className="py-2.5 px-3">64 cm</td>
                    <td className="py-2.5 px-3">75 cm</td>
                    <td className="py-2.5 px-3">59 cm</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold">XL</td>
                    <td className="py-2.5 px-3">67 cm</td>
                    <td className="py-2.5 px-3">77 cm</td>
                    <td className="py-2.5 px-3">61 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="bg-[#315074] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

