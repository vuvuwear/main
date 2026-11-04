"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Ruler, ShieldCheck, RefreshCw, Sparkles, X } from "lucide-react";

export default function LookbookSection() {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <section id="lookbook" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#315074]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F1F9FE]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#315074] bg-[#F1F9FE]/10 px-3 py-1 rounded-full border border-white/10">
            EDITORIAL // 2026
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-4">
            The Philosophy of Form & Weight
          </h2>
          <p className="mt-4 text-base text-gray-400 font-light leading-relaxed">
            At VUVU, we discard flimsy seasonal disposable fashion. Every garment is constructed with high-density weights (300 to 460 GSM), double-reinforced collar ribbing, and clean architectural lines that drape effortlessly.
          </p>

          <button
            onClick={() => setSizeGuideOpen(true)}
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#F1F9FE] hover:text-[#315074] transition-colors border-b border-[#315074] pb-1"
          >
            <Ruler className="w-4 h-4 text-[#315074]" />
            <span>Interactive Size Guide & Measurement Chart</span>
          </button>
        </div>

        {/* Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-[480px] rounded-lg overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85"
              alt="Vuvu Lookbook Frame 01"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-mono text-[#315074] uppercase tracking-widest font-bold">
                  Look 01
                </span>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                  Heavy Loopback Hoodie + Utility Trouser
                </h4>
              </div>
            </div>
          </div>

          <div className="relative h-[480px] rounded-lg overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85"
              alt="Vuvu Lookbook Frame 02"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-mono text-[#315074] uppercase tracking-widest font-bold">
                  Look 02
                </span>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                  Architectural Boxy Tee in Steel Blue
                </h4>
              </div>
            </div>
          </div>

          <div className="relative h-[480px] rounded-lg overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=85"
              alt="Vuvu Lookbook Frame 03"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-mono text-[#315074] uppercase tracking-widest font-bold">
                  Look 03
                </span>
                <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                  Matte Technical Shell Layering
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#315074]/30 border border-[#315074] flex items-center justify-center text-[#F1F9FE] flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#315074]" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Egyptian Combed Cotton
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Extra-long staple yarn combed to remove short fibers, resulting in an ultra-smooth surface that resists pilling indefinitely.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#315074]/30 border border-[#315074] flex items-center justify-center text-[#F1F9FE] flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-[#315074]" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Pre-Shrunk & Garment Washed
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Every piece undergoes industrial garment pre-washing to eliminate shrinkage, guaranteeing the exact fit out of the box remains the fit forever.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#315074]/30 border border-[#315074] flex items-center justify-center text-[#F1F9FE] flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#315074]" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Reinforced 1.25" Ribbed Collar
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Custom high-tension elastane-infused ribbing ensures the neckline remains pristine, flush, and rigid wash after wash.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-white text-black max-w-xl w-full rounded-xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#315074]" />
                <h3 className="text-lg font-bold uppercase tracking-wider">
                  VUVU Garment Measurement Guide
                </h3>
              </div>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              All measurements are taken in centimeters (cm) with the garment laid flat. Our tees and hoodies have an intended boxy, relaxed drop-shoulder cut. Take your normal size for the intended streetwear look.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F1F9FE] text-[#315074] uppercase font-mono font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest (Width)</th>
                    <th className="py-2.5 px-3">Length</th>
                    <th className="py-2.5 px-3">Shoulder Drop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-bold">S</td>
                    <td className="py-2.5 px-3">58 cm</td>
                    <td className="py-2.5 px-3">71 cm</td>
                    <td className="py-2.5 px-3">55 cm</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold">M</td>
                    <td className="py-2.5 px-3">61 cm</td>
                    <td className="py-2.5 px-3">73 cm</td>
                    <td className="py-2.5 px-3">57 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold">L</td>
                    <td className="py-2.5 px-3">64 cm</td>
                    <td className="py-2.5 px-3">75 cm</td>
                    <td className="py-2.5 px-3">59 cm</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold">XL</td>
                    <td className="py-2.5 px-3">67 cm</td>
                    <td className="py-2.5 px-3">77 cm</td>
                    <td className="py-2.5 px-3">61 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="bg-[#315074] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

