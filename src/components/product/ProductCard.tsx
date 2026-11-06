"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Check } from "lucide-react";
import { Product, ProductSize } from "@/types/product";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
  preloadImage?: boolean;
}

export default function ProductCard({
  product,
  preloadImage = false,
}: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;
  const hasSecondary = product.images.length > 1;

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedSize(size);
    addItem(product, activeColor.name, activeColor.hex, size, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedSize(null);
    }, 1400);
  };

  return (
    <article className="group relative flex flex-col bg-white border border-line/70 transition-all duration-500 hover:border-charcoal/30">
      {/* ------------------------------------------------------------------
          Image presentation with subtle hover transition
          ------------------------------------------------------------------ */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative"
          aria-label={`View details for ${product.name}`}
        >
          {/* Primary image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            preload={preloadImage}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              hasSecondary
                ? "group-hover:opacity-0 group-hover:scale-[1.03]"
                : "group-hover:scale-[1.03]"
            }`}
          />

          {/* Secondary image (editorial swap on hover) */}
          {hasSecondary && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-100 group-hover:scale-[1.03]"
            />
          )}
        </Link>

        {/* Badge — quiet, refined typography */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span
              className={`inline-block px-2.5 py-1 text-[10px] tracking-[0.14em] font-medium uppercase ${
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

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 text-charcoal/70 hover:text-charcoal transition-colors rounded-full bg-white/70 backdrop-blur-xs hover:bg-white"
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

        {/* Quick-add size drawer (appears on hover on desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md border border-line p-2.5 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-muted text-center mb-1.5">
              Quick Add
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={(e) => handleQuickAdd(s.size, e)}
                  className={`min-w-8 h-8 px-1.5 text-xs font-mono font-medium border transition-colors ${
                    !s.inStock
                      ? "text-stone border-transparent cursor-not-allowed line-through"
                      : selectedSize === s.size && addedAnimation
                      ? "bg-vuvu-blue text-white border-vuvu-blue"
                      : "bg-ivory/60 text-charcoal border-line hover:border-charcoal hover:bg-white"
                  }`}
                  aria-label={`Select size ${s.size}`}
                >
                  {selectedSize === s.size && addedAnimation ? (
                    <Check className="w-3.5 h-3.5 mx-auto" />
                  ) : (
                    s.size
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          Product metadata
          ------------------------------------------------------------------ */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Colorway swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIndex === idx
                      ? "ring-1 ring-offset-2 ring-charcoal border-transparent"
                      : "border-stone hover:opacity-80"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
              <span className="text-[11px] text-muted ml-1.5 font-normal">
                {activeColor.name}
              </span>
            </div>
          )}

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display font-normal text-sm sm:text-base text-charcoal group-hover:text-vuvu-blue transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Tagline */}
          <p className="text-xs text-muted mt-1 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-4 pt-3 border-t border-line/60 flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted font-medium">
            {product.category}
          </span>
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-muted line-through font-mono">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm font-medium font-mono text-charcoal">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
