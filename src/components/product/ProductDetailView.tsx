"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  X,
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
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"fabric" | "fit" | "care" | "delivery">("fabric");
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
    <div className="bg-ivory">
      {/* ------------------------------------------------------------------
          Breadcrumb — quiet, restrained
          ------------------------------------------------------------------ */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-line bg-white/60 py-3.5"
      >
        <div className="container-vuvu flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone" />
          <Link
            href={`/#${product.category}`}
            className="hover:text-charcoal uppercase transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-stone" />
          <span className="text-charcoal font-medium truncate max-w-xs">
            {product.name}
          </span>
        </div>
      </nav>

      {/* ------------------------------------------------------------------
          Main PDP Gallery and Info
          ------------------------------------------------------------------ */}
      <div className="container-vuvu py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Presentation (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[720px] scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0 bg-white border transition-all ${
                      activeImageIndex === idx
                        ? "border-charcoal shadow-xs"
                        : "border-line opacity-75 hover:opacity-100"
                    }`}
                    aria-label={`Show photo ${idx + 1}`}
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
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-white border border-line overflow-hidden">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-300"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3 py-1 text-[10px] tracking-[0.14em] font-medium uppercase ${
                      product.badge === "NEW DROP"
                        ? "bg-vuvu-blue text-white"
                        : product.badge === "BESTSELLER"
                        ? "bg-charcoal text-white"
                        : "bg-white text-charcoal border border-line"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-xs text-charcoal hover:bg-white shadow-xs transition-colors"
                aria-label={
                  inWishlist ? "Remove from wishlist" : "Save to wishlist"
                }
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    inWishlist ? "fill-vuvu-blue text-vuvu-blue" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div>
              <div className="flex items-center gap-3 text-xs text-muted mb-2">
                <span className="eyebrow text-vuvu-blue">
                  {product.category}
                </span>
                <span className="text-stone">•</span>
                <span className="text-[11px] font-mono text-muted">
                  {product.reviewCount} Verified Reviews
                </span>
              </div>

              <h1 className="heading text-2xl sm:text-3xl text-charcoal">
                {product.name}
              </h1>

              <p className="text-xs text-muted mt-1 leading-relaxed">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-2xl font-normal font-mono text-charcoal">
                  ${product.price}.00
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm font-mono text-muted line-through">
                      ${product.originalPrice}.00
                    </span>
                    <span className="text-xs font-mono text-vuvu-blue bg-white border border-stone px-2 py-0.5">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-line my-6" />

            {/* Description */}
            <p className="text-xs text-charcoal/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Colorway Swatches */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="eyebrow text-charcoal">Colorway:</span>
                <span className="text-xs font-medium text-charcoal">
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
                        ? "ring-1 ring-offset-2 ring-charcoal"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`Select ${color.name}`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-stone block"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="eyebrow text-charcoal">Select Size:</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-xs text-charcoal/80 hover:text-vuvu-blue transition-colors link-underline"
                >
                  <Ruler className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-3 text-xs font-mono transition-all border ${
                      !s.inStock
                        ? "text-stone bg-ivory/50 border-line/60 cursor-not-allowed line-through"
                        : selectedSize === s.size
                        ? "bg-charcoal text-white border-charcoal font-medium"
                        : "bg-white text-charcoal border-line hover:border-charcoal"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="mt-8 flex gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-stone bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-muted hover:text-charcoal hover:bg-ivory transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
                <span className="w-8 text-center text-xs font-mono font-medium text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-muted hover:text-charcoal hover:bg-ivory transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className={`btn flex-1 transition-all duration-300 ${
                  isAdded ? "btn-brand" : "btn-primary"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                    <span>
                      Add To Bag • ${(product.price * quantity).toFixed(2)}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Service & Trust Points */}
            <div className="mt-8 p-4 bg-white border border-line space-y-2.5 text-xs text-charcoal/85">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-vuvu-blue flex-shrink-0" strokeWidth={1.5} />
                <span>
                  <strong>Complimentary delivery</strong> on all orders over $100.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-vuvu-blue flex-shrink-0" strokeWidth={1.5} />
                <span>
                  <strong>30-day returns</strong> with pre-paid return labels.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-vuvu-blue flex-shrink-0" strokeWidth={1.5} />
                <span>
                  <strong>Pre-shrunk fabric</strong> — guaranteed shape permanence.
                </span>
              </div>
            </div>

            {/* Tabs for Fabric, Fit, Care, Delivery */}
            <div className="mt-8 border-t border-line pt-6">
              <div className="flex border-b border-line gap-6">
                <button
                  onClick={() => setActiveTab("fabric")}
                  className={`pb-3 text-xs uppercase tracking-[0.12em] font-medium transition-colors relative ${
                    activeTab === "fabric"
                      ? "text-charcoal"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  Fabric & Origin
                  {activeTab === "fabric" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("fit")}
                  className={`pb-3 text-xs uppercase tracking-[0.12em] font-medium transition-colors relative ${
                    activeTab === "fit"
                      ? "text-charcoal"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  Fit & Cut
                  {activeTab === "fit" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-3 text-xs uppercase tracking-[0.12em] font-medium transition-colors relative ${
                    activeTab === "care"
                      ? "text-charcoal"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  Garment Care
                  {activeTab === "care" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
                  )}
                </button>
              </div>

              <div className="py-4 text-xs text-muted leading-relaxed font-light">
                {activeTab === "fabric" && (
                  <div className="space-y-2">
                    <p className="font-medium text-charcoal">{product.fabric}</p>
                    <ul className="list-disc pl-4 space-y-1 text-muted">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "fit" && (
                  <div>
                    <p className="font-medium text-charcoal mb-1">{product.fit}</p>
                    <p>
                      Engineered with a contemporary drop shoulder and generous chest volume. Designed to drape naturally without clinging. If you prefer a closer, tailored profile, we suggest sizing down one size.
                    </p>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-1.5 text-muted">
                    <p>• Machine wash cold (30°C / 85°F) with similar tones.</p>
                    <p>• Wash inside out to protect the surface weave.</p>
                    <p>• Line dry in shade; do not tumble dry.</p>
                    <p>• Warm iron inside out if desired.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Related Products — Complete the Silhouette
            ------------------------------------------------------------------ */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-line">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-line gap-4">
              <div>
                <span className="eyebrow text-muted block mb-1">
                  Considered Pairings
                </span>
                <h2 className="heading text-2xl sm:text-3xl text-charcoal">
                  Complete the Silhouette
                </h2>
              </div>
              <Link
                href="/#products"
                className="text-xs uppercase tracking-[0.12em] font-medium text-charcoal hover:text-vuvu-blue transition-colors link-underline self-start sm:self-end"
              >
                View All Wardrobe
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
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSizeGuideOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Measurement Guide"
            className="relative bg-white text-charcoal max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-line animate-[fade-in_0.2s_var(--ease-soft)]"
          >
            <div className="flex justify-between items-center pb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-vuvu-blue" strokeWidth={1.5} />
                <h3 className="font-display text-lg text-charcoal">
                  VUVU Sizing Chart
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1.5 text-muted hover:text-charcoal rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-4 text-xs text-muted">
              Flat measurements in centimeters (cm):
            </div>

            <div className="mt-4 overflow-x-auto border border-line">
              <table className="w-full text-xs text-left">
                <thead className="bg-ivory text-charcoal uppercase font-mono font-medium border-b border-line">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest Width</th>
                    <th className="py-2.5 px-3">Length</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-charcoal">S</td>
                    <td className="py-2.5 px-3">58 cm</td>
                    <td className="py-2.5 px-3">71 cm</td>
                    <td className="py-2.5 px-3">55 cm</td>
                  </tr>
                  <tr className="bg-ivory/30">
                    <td className="py-2.5 px-3 font-bold text-charcoal">M</td>
                    <td className="py-2.5 px-3">61 cm</td>
                    <td className="py-2.5 px-3">73 cm</td>
                    <td className="py-2.5 px-3">57 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-charcoal">L</td>
                    <td className="py-2.5 px-3">64 cm</td>
                    <td className="py-2.5 px-3">75 cm</td>
                    <td className="py-2.5 px-3">59 cm</td>
                  </tr>
                  <tr className="bg-ivory/30">
                    <td className="py-2.5 px-3 font-bold text-charcoal">XL</td>
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
                className="btn btn-primary text-xs"
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
