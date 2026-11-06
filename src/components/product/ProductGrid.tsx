"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  initialCategory?: string;
  id?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "tees", label: "Tees & Tops" },
  { id: "hoodies", label: "Hoodies" },
  { id: "pants", label: "Trousers" },
  { id: "jackets", label: "Outerwear" },
  { id: "accessories", label: "Accessories" },
];

export default function ProductGrid({
  products,
  title = "Considered Silhouettes",
  subtitle = "Engineered essentials designed with deliberate proportions and enduring materials.",
  eyebrow = "Catalog // Drop 01",
  initialCategory = "all",
  id = "products",
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <section id={id} className="py-20 sm:py-28 bg-white border-t border-line scroll-mt-20">
      <div className="container-vuvu">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-line gap-6">
          <div className="max-w-xl">
            <span className="eyebrow text-muted block mb-2">{eyebrow}</span>
            <h2 className="heading text-3xl sm:text-4xl text-charcoal">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="flex items-center gap-2 bg-ivory border border-stone px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted" strokeWidth={1.5} />
              <label htmlFor="grid-sort" className="text-muted font-normal">
                Sort:
              </label>
              <select
                id="grid-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-charcoal focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills — calm, minimal design */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? products.length
                : products.filter((p) => p.category === cat.id).length;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-colors ${
                  isActive
                    ? "bg-charcoal text-white"
                    : "bg-ivory text-charcoal/80 hover:bg-stone/60 border border-stone/50"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-ivory border border-line p-8">
            <h3 className="font-display text-lg text-charcoal">
              No items in this category
            </h3>
            <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
              Select another category or view all garments from the current drop.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="mt-6 btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
