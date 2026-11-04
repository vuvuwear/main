"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Compass, Layers } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="relative w-full bg-[#000000] text-white overflow-hidden">
      {/* Background with Dark Subtle Gradient & Mood Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
          alt="Vuvu Hero Collection"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 flex flex-col justify-center min-h-[82vh]">
        <div className="max-w-2xl">
          {/* Brand Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#315074]/50 border border-[#315074] text-[#F1F9FE] text-xs font-mono uppercase tracking-[0.25em] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F1F9FE] animate-pulse" />
            <span>Drop 01 • Available Now</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white">
            Architectural <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1F9FE] via-[#315074] to-white">
              Essentials
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-[#F1F9FE]/80 max-w-lg leading-relaxed font-light">
            Engineered silhouettes built with 300+ GSM custom-milled heavyweight combed cotton. Precision draping meets raw contemporary street aesthetics.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="bg-[#315074] hover:bg-[#4872a4] text-white font-bold px-8 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-lg hover:shadow-[#315074]/30 flex items-center gap-3 group"
            >
              <span>Explore The Drop</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#lookbook"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white font-bold px-8 py-4 text-xs uppercase tracking-[0.25em] transition-all duration-300 backdrop-blur-xs"
            >
              View Lookbook
            </a>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#315074]" />
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-white">
                300–460 GSM
              </div>
              <div className="text-[11px] text-gray-400">
                Heavyweight Structure
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#315074]" />
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-white">
                Anti-Pilling Cotton
              </div>
              <div className="text-[11px] text-gray-400">
                100+ Wash Longevity
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#315074]" />
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-white">
                Boxy Drop Silhouette
              </div>
              <div className="text-[11px] text-gray-400">
                True Architectural Fit
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#315074]" />
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-white">
                Free Worldwide Shipping
              </div>
              <div className="text-[11px] text-gray-400">
                On Orders Over $100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

