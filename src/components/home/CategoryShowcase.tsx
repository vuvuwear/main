"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Tees & Tops",
    tagline: "300 GSM Combed Cotton",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    href: "/#tees",
    badge: "Signature Cut",
  },
  {
    name: "Heavy Hoodies",
    tagline: "460 GSM Loopback Fleece",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    href: "/#hoodies",
    badge: "Winter Heavyweight",
  },
  {
    name: "Utility Trousers",
    tagline: "Tailored Wide-Leg Cut",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    href: "/#pants",
    badge: "Water Repellent",
  },
  {
    name: "Outerwear",
    tagline: "Matte Technical Shells",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    href: "/#jackets",
    badge: "Limited Release",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-[#F1F9FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#315074] font-bold font-mono">
              The Wardrobe System
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black mt-2">
              Curated Collections
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-sm mt-3 sm:mt-0">
            Engineered modular apparel built to harmonize across tones, silhouettes, and layering weights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="group relative h-96 overflow-hidden rounded-lg bg-black shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center opacity-85 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#315074] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  {cat.badge}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase text-white tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#F1F9FE]/80 mt-0.5 font-mono">
                    {cat.tagline}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#315074] group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

