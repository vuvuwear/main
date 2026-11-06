"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-ivory overflow-hidden border-b border-line">
      {/* ------------------------------------------------------------------
          Hero Layout: Editorial split with architectural campaign photography
          ------------------------------------------------------------------ */}
      <div className="container-vuvu">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-var(--nav-height)-37px)] lg:min-h-[82vh] items-stretch">
          {/* Left Column — Editorial Campaign Copy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-12 lg:py-20 lg:pr-12">
            <div>
              <span className="eyebrow text-muted block mb-6">
                Autumn / Winter 2026 — Drop 01
              </span>

              <h1 className="display text-4xl sm:text-6xl lg:text-7xl text-charcoal tracking-tight">
                EVERYDAY,
                <br />
                <span className="text-vuvu-blue italic font-normal">
                  REFINED.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-muted max-w-md leading-relaxed font-light">
                Considered essentials. Made for everyday living.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  className="btn btn-primary"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#campaign"
                  className="btn btn-outline"
                >
                  View Campaign
                </a>
              </div>
            </div>

            {/* Editorial Footer Notes */}
            <div className="pt-12 mt-12 border-t border-line grid grid-cols-3 gap-6 text-left">
              <div>
                <p className="eyebrow text-muted">Aesthetic</p>
                <p className="text-xs text-charcoal mt-1 font-medium">
                  Scandinavian Minimal
                </p>
              </div>
              <div>
                <p className="eyebrow text-muted">Fit</p>
                <p className="text-xs text-charcoal mt-1 font-medium">
                  Contemporary Unisex
                </p>
              </div>
              <div>
                <p className="eyebrow text-muted">Fabrics</p>
                <p className="text-xs text-charcoal mt-1 font-medium">
                  Egyptian Combed Cotton
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — Large Scandinavian Campaign Imagery (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[480px] lg:min-h-full my-6 lg:my-0">
            <div className="relative w-full h-full min-h-[460px] overflow-hidden bg-stone/30">
              <Image
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
                alt="VUVU Campaign — Everyday, Refined"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center filter contrast-[1.02] brightness-[0.98]"
              />

              {/* Gentle subtle framing badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-line">
                <span className="eyebrow text-charcoal">
                  Drop 01 // Silhouette Study
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
