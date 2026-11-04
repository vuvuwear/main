"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Check, Sparkles } from "lucide-react";
import { Product, ProductSize } from "@/types/product";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const inWishlist = isInWishlist(product.id);

  // If product has multiple images, show secondary on hover
  const displayImage =
    isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0];

  const handleQuickAdd = (size: ProductSize, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedSize(size);
    addItem(product, activeColor.name, activeColor.hex, size, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedSize(null);
    }, 1500);
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-gray-100 hover:border-[#315074]/30 hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[3/4] w-full overflow-hidden bg-[#F1F9FE]"
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm shadow-xs ${
                product.badge === "NEW DROP"
                  ? "bg-[#315074] text-white"
                  : product.badge === "BESTSELLER"
                  ? "bg-black text-white"
                  : product.badge === "LIMITED"
                  ? "bg-amber-600 text-white"
                  : "bg-rose-600 text-white"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 hover:text-rose-600 hover:bg-white shadow-xs transition-colors"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? "fill-rose-600 text-rose-600" : ""
            }`}
          />
        </button>

        {/* Quick Size Select Bar on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-md shadow-lg border border-gray-100">
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider text-center mb-1.5">
              Quick Add To Bag
            </div>
            <div className="grid grid-cols-5 gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={(e) => handleQuickAdd(s.size, e)}
                  className={`py-1 text-xs font-mono font-bold rounded transition-all ${
                    !s.inStock
                      ? "text-gray-300 bg-gray-50 cursor-not-allowed line-through"
                      : selectedSize === s.size && addedAnimation
                      ? "bg-emerald-600 text-white"
                      : "bg-[#F1F9FE] text-black hover:bg-[#315074] hover:text-white"
                  }`}
                  title={!s.inStock ? `${s.size} - Out of stock` : `Add size ${s.size}`}
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
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mb-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? "ring-2 ring-offset-1 ring-[#315074] scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Color ${color.name}`}
              />
            ))}
            <span className="text-[11px] text-gray-400 font-medium ml-1">
              {activeColor.name}
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-semibold text-sm text-neutral-900 group-hover:text-[#315074] transition-colors line-clamp-1 hover:underline">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono font-semibold text-neutral-700">
              {product.rating}
            </span>
            <span className="text-gray-400 text-[10px]">
              ({product.reviewCount})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-mono">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm font-bold font-mono text-black">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

