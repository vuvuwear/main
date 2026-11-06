"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ruler, X, ArrowRight } from "lucide-react";

const CAMPAIGN_LOOKS = [
  {
    look: "01",
    title: "Double-Faced Fleece & Wide Trousers",
    tagline: "460 GSM Loopback Hoodie in VUVU Blue paired with pleated wide-leg trousers.",
    image:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85",
    productSlug: "heavy-french-terry-drop-shoulder-hoodie",
  },
  {
    look: "02",
    title: "Architectural Boxy Tee Silhouette",
    tagline: "300 GSM combed cotton draped effortlessly with a clean drop shoulder.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85",
    productSlug: "architectural-heavyweight-boxy-tee",
  },
  {
    look: "03",
    title: "Matte Technical Layering",
    tagline: "Weather-resistant shell over heavy organic fleece for transitional days.",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=85",
    productSlug: "tactical-matte-nylon-shell-jacket",
  },
];

export default function LookbookSection() {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <section id="campaign" className="py-24 sm:py-32 bg-white border-t border-line scroll-mt-20">
      <div className="container-vuvu">
        {/* Campaign Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-line gap-6">
          <div className="max-w-xl">
            <span className="eyebrow text-muted block mb-2">
              Campaign // Current Series
            </span>
            <h2 className="heading text-3xl sm:text-5xl text-charcoal">
              Form & Everyday Comfort
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed font-light">
              Natural daylight, quiet architectural geometry, and relaxed model silhouettes. An editorial study of how our pieces move throughout the day.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-medium text-charcoal hover:text-vuvu-blue transition-colors border-b border-stone pb-1"
            >
              <Ruler className="w-3.5 h-3.5 text-vuvu-blue" strokeWidth={1.5} />
              <span>Interactive Size Guide</span>
            </button>
          </div>
        </div>

        {/* 3-Column Editorial Campaign Frames */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAMPAIGN_LOOKS.map((item) => (
            <div
              key={item.look}
              className="group flex flex-col bg-ivory/50 border border-line/80 overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone/20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase text-charcoal tracking-wider border border-line">
                  Look {item.look}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="font-display text-lg text-charcoal group-hover:text-vuvu-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed font-light">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                  <Link
                    href={`/product/${item.productSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium text-charcoal hover:text-vuvu-blue transition-colors link-underline"
                  >
                    <span>View Piece</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-[11px] font-mono text-muted">
                    VUVU Core
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Guide Modal — quiet, refined table */}
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
            aria-label="Size Guide"
            className="relative bg-white text-charcoal max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-line animate-[fade-in_0.2s_var(--ease-soft)]"
          >
            <div className="flex justify-between items-center pb-4 border-b border-line">
              <div>
                <span className="eyebrow text-muted">Measurement Guide</span>
                <h3 className="font-display text-xl text-charcoal mt-0.5">
                  VUVU Sizing Chart
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1.5 text-muted hover:text-charcoal rounded-full"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <p className="text-xs text-muted mt-4 leading-relaxed font-light">
              All garments are measured in centimeters (cm) laid flat. Our tees and hoodies feature a deliberate drop-shoulder cut with generous chest volume. Choose your standard size for the intended contemporary fit.
            </p>

            <div className="mt-6 overflow-x-auto border border-line">
              <table className="w-full text-xs text-left">
                <thead className="bg-ivory text-charcoal uppercase font-mono border-b border-line">
                  <tr>
                    <th className="py-3 px-4 font-medium">Size</th>
                    <th className="py-3 px-4 font-medium">Chest Width</th>
                    <th className="py-3 px-4 font-medium">Body Length</th>
                    <th className="py-3 px-4 font-medium">Shoulder Drop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-mono text-charcoal/90">
                  <tr>
                    <td className="py-3 px-4 font-bold text-charcoal">S</td>
                    <td className="py-3 px-4">58 cm</td>
                    <td className="py-3 px-4">71 cm</td>
                    <td className="py-3 px-4">55 cm</td>
                  </tr>
                  <tr className="bg-ivory/30">
                    <td className="py-3 px-4 font-bold text-charcoal">M</td>
                    <td className="py-3 px-4">61 cm</td>
                    <td className="py-3 px-4">73 cm</td>
                    <td className="py-3 px-4">57 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-charcoal">L</td>
                    <td className="py-3 px-4">64 cm</td>
                    <td className="py-3 px-4">75 cm</td>
                    <td className="py-3 px-4">59 cm</td>
                  </tr>
                  <tr className="bg-ivory/30">
                    <td className="py-3 px-4 font-bold text-charcoal">XL</td>
                    <td className="py-3 px-4">67 cm</td>
                    <td className="py-3 px-4">77 cm</td>
                    <td className="py-3 px-4">61 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="btn btn-primary text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
