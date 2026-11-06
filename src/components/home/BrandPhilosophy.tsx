"use client";

import React from "react";
import Image from "next/image";

export default function BrandPhilosophy() {
  return (
    <section id="about" className="py-24 sm:py-36 bg-ivory border-t border-line scroll-mt-20">
      <div className="container-vuvu">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Image with generous whitespace */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto bg-stone/30 border border-line overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85"
                alt="VUVU Philosophy — Form and Craft"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 border border-line">
                <span className="eyebrow text-charcoal">
                  Atelier Note 01
                </span>
              </div>
            </div>
          </div>

          {/* Copy and Manifesto */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <span className="eyebrow text-muted block mb-4">
              Brand Philosophy
            </span>

            <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight">
              LESS, BUT BETTER.
            </h2>

            <p className="mt-6 text-lg sm:text-xl text-charcoal/90 leading-relaxed font-light">
              We believe in thoughtful design, timeless silhouettes, and everyday comfort.
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted leading-relaxed font-light max-w-lg">
              <p>
                VUVU was founded on a simple principle: clothing shouldn’t be disposable, overly branded, or designed for a single season. We create contemporary everyday pieces engineered with heavyweight natural cottons, calm proportions, and enduring craftsmanship.
              </p>
              <p>
                Our signature blue letterforms provide the brand’s distinctive spirit; the garments themselves provide quiet confidence, ease, and refined permanence.
              </p>
            </div>

            {/* Three refined commitments */}
            <div className="mt-10 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="eyebrow text-vuvu-blue block mb-1">01 / Craft</span>
                <p className="text-xs text-charcoal font-medium">300+ GSM Egyptian Cotton</p>
                <p className="text-[11px] text-muted mt-0.5">Heavyweight durability</p>
              </div>
              <div>
                <span className="eyebrow text-vuvu-blue block mb-1">02 / Proportion</span>
                <p className="text-xs text-charcoal font-medium">Considered Drape</p>
                <p className="text-[11px] text-muted mt-0.5">Drop-shoulder unisex cut</p>
              </div>
              <div>
                <span className="eyebrow text-vuvu-blue block mb-1">03 / Longevity</span>
                <p className="text-xs text-charcoal font-medium">Pre-Shrunk Hems</p>
                <p className="text-[11px] text-muted mt-0.5">Shape retention 100+ washes</p>
              </div>
            </div>

            <div className="mt-10">
              <a href="#products" className="btn btn-outline">
                Explore The Essentials
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

