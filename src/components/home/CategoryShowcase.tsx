"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Tees & Tops",
    tagline: "Heavyweight combed cotton",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    href: "/#tees",
  },
  {
    name: "Hoodies",
    tagline: "Dense loopback fleece",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    href: "/#hoodies",
  },
  {
    name: "Trousers",
    tagline: "Tailored wide-leg utility",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    href: "/#pants",
  },
  {
    name: "Outerwear",
    tagline: "Matte technical shells",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    href: "/#jackets",
  },
];

export default function CategoryShowcase() {
  return (
    <section id="collections" className="py-20 sm:py-28 bg-ivory scroll-mt-20">
      <div className="container-vuvu">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 border-b border-line gap-4">
          <div>
            <span className="eyebrow text-muted block mb-2">
              Wardrobe Architecture
            </span>
            <h2 className="heading text-3xl sm:text-4xl text-charcoal">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-sm">
            Modular garments built to harmonize across tones, weights, and daily silhouettes.
          </p>
        </div>

        {/* 4-Column Minimal Editorial Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative flex flex-col bg-white border border-line transition-all duration-500 hover:border-charcoal/40"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone/20">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-5 flex items-center justify-between border-t border-line/60 bg-white">
                <div>
                  <h3 className="font-display text-base font-normal text-charcoal group-hover:text-vuvu-blue transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted mt-0.5 font-light">
                    {cat.tagline}
                  </p>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-muted group-hover:text-charcoal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
