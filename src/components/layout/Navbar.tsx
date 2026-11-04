"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import VuvuLogo from "@/components/ui/VuvuLogo";

const NAV_LINKS = [
  { name: "Shop All", href: "/#products" },
  { name: "Tees", href: "/#tees" },
  { name: "Hoodies", href: "/#hoodies" },
  { name: "Pants & Utility", href: "/#pants" },
  { name: "Outerwear", href: "/#jackets" },
  { name: "Lookbook", href: "/#lookbook" },
];

export default function Navbar() {
  const { openCart, getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      {/* Top Banner */}
      <div className="bg-[#315074] text-[#F1F9FE] px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase flex items-center justify-between transition-colors">
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <span>CURRENCY: USD ($)</span>
          <span>•</span>
          <span>FREE SHIPPING OVER $100</span>
        </div>
        <div className="w-full md:w-auto text-center font-semibold">
          DROP 01 IS LIVE • LIMITED ARCHIVAL RUN
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <Link href="/#about" className="hover:underline">
            OUR MANIFESTO
          </Link>
          <span>•</span>
          <Link href="/#stores" className="hover:underline">
            FIND A STOCKIST
          </Link>
        </div>
      </div>

      {/* Main Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "border-gray-200/80 bg-white/95 backdrop-blur-md shadow-xs py-3"
            : "border-gray-100 bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-black hover:text-[#315074] transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Left Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.18em] font-semibold text-neutral-800 hover:text-[#315074] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#315074] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Center Brand Logo */}
          <div className="flex-1 lg:flex-none flex justify-center">
            <VuvuLogo size="md" />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => {
                const el = document.getElementById("products");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-2 text-neutral-800 hover:text-[#315074] transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/#wishlist"
              className="relative p-2 text-neutral-800 hover:text-[#315074] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#315074] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#F1F9FE] hover:bg-[#315074] hover:text-white text-[#315074] px-3.5 py-2 rounded-full border border-[#315074]/20 transition-all duration-200 group"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold font-mono tracking-wider">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <VuvuLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-black rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col space-y-5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base uppercase tracking-widest font-bold text-black hover:text-[#315074] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="text-xs text-gray-500 font-mono">
                VUVU WEAR © ALL RIGHTS RESERVED
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#315074] inline-block" />
                <span className="text-xs uppercase tracking-wider font-semibold text-[#315074]">
                  Contemporary Apparel
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

