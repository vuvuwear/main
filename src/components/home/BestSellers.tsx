"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  // Filter bestsellers or featured items, fallback to first 3 products
  const bestsellers = products.filter(
    (p) => p.badge === "BESTSELLER" || p.isFeatured
  ).slice(0, 3);

  const displayItems = bestsellers.length >= 2 ? bestsellers : products.slice(0, 3);

  if (displayItems.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-ivory border-t border-line">
      <div className="container-vuvu">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 border-b border-line gap-4">
          <div>
            <span className="eyebrow text-muted block mb-2">
              Most Considered
            </span>
            <h2 className="heading text-3xl sm:text-4xl text-charcoal">
              Best Sellers
            </h2>
          </div>
          <a
            href="#products"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium text-charcoal hover:text-vuvu-blue transition-colors link-underline self-start sm:self-end"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

