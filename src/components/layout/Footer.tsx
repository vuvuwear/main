"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#000000] text-white border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-[#0f1722]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#315074] bg-[#F1F9FE] px-2.5 py-1 rounded">
                EXCLUSIVE ACCESS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-3">
                Join the VUVU Syndicate
              </h3>
              <p className="text-sm text-gray-400 mt-2 max-w-md font-light">
                Receive private password drop access 2 hours before public release, archival lookbooks, and 10% off your first order.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 bg-[#315074]/30 border border-[#315074] p-4 rounded text-white">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    Welcome to the Syndicate. Check your inbox for your 10% welcome code.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#315074] focus:bg-white/10 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#315074] hover:bg-[#4872a4] text-white font-bold px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <VuvuLogo size="md" />
            <p className="text-xs text-gray-400 mt-4 max-w-sm leading-relaxed">
              VUVU is an independent contemporary fashion house specializing in heavyweight, engineered architectural apparel. Crafted with high-grade Egyptian cotton and designed for permanence.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Worldwide Express Fulfillment Active</span>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#315074] mb-4">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/#products" className="hover:text-white transition-colors">
                  All Drops
                </Link>
              </li>
              <li>
                <Link href="/#tees" className="hover:text-white transition-colors">
                  Heavy Boxy Tees
                </Link>
              </li>
              <li>
                <Link href="/#hoodies" className="hover:text-white transition-colors">
                  French Terry Hoodies
                </Link>
              </li>
              <li>
                <Link href="/#pants" className="hover:text-white transition-colors">
                  Utility Trousers
                </Link>
              </li>
              <li>
                <Link href="/#jackets" className="hover:text-white transition-colors">
                  Matte Nylon Outerwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#315074] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/#lookbook" className="hover:text-white transition-colors">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link href="/#orders" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/#shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/#returns" className="hover:text-white transition-colors">
                  30-Day Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQs & Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* About / Manifesto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#315074] mb-4">
              House of Vuvu
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/#manifesto" className="hover:text-white transition-colors">
                  Our Manifesto
                </Link>
              </li>
              <li>
                <Link href="/#sustainability" className="hover:text-white transition-colors">
                  Fabric Sourcing (300+ GSM)
                </Link>
              </li>
              <li>
                <Link href="/#stockists" className="hover:text-white transition-colors">
                  Stockists
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Press & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <div>
            © 2026 VUVU WEAR. All rights reserved.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-gray-400">
            <span className="bg-white/10 px-2 py-1 rounded">STRIPE</span>
            <span className="bg-white/10 px-2 py-1 rounded">APPLE PAY</span>
            <span className="bg-white/10 px-2 py-1 rounded">VISA</span>
            <span className="bg-white/10 px-2 py-1 rounded">MASTERCARD</span>
            <span className="bg-[#315074] text-white px-2 py-1 rounded font-bold">CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

