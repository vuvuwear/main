"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "tees", label: "Tees & Tops" },
    { id: "hoodies", label: "Hoodies" },
    { id: "pants", label: "Pants & Utility" },
    { id: "jackets", label: "Outerwear" },
    { id: "accessories", label: "Accessories" },
  ];

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
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-8 mb-8 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#315074]">
              Drop 01 Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mt-1">
              Curated Essentials
            </h2>
          </div>

          {/* Controls: Category Filter and Sort */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort selector */}
            <div className="flex items-center gap-2 bg-[#F1F9FE] px-3 py-2 rounded-lg border border-gray-200 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#315074]" />
              <label htmlFor="sort-select" className="text-gray-500 font-semibold">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-black focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? products.length
                : products.filter((p) => p.category === cat.id).length;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#315074] text-white shadow-sm"
                    : "bg-[#F1F9FE] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#F1F9FE] rounded-xl p-8">
            <h3 className="text-lg font-bold uppercase text-black">
              No Pieces Found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Try switching your category filter or check back for upcoming drops.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="mt-6 bg-[#315074] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-bold rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

