"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";
import { useCartStore } from "@/lib/store/useCartStore";
import { useMounted } from "@/lib/useMounted";

const PRIMARY_LINKS = [
  { name: "Shop", href: "/#products" },
  { name: "Collections", href: "/#collections" },
  { name: "About", href: "/#about" },
];

const SECONDARY_LINKS = [
  { name: "Tees & Tops", href: "/#tees" },
  { name: "Hoodies", href: "/#hoodies" },
  { name: "Trousers", href: "/#pants" },
  { name: "Outerwear", href: "/#jackets" },
  { name: "Lookbook", href: "/#lookbook" },
];

export default function Navbar() {
  const router = useRouter();
  const mounted = useMounted();
  const { openCart, getItemCount } = useCartStore();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const cartCount = mounted ? getItemCount() : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    // Smooth scroll to products and let user browse
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#products");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-ivory/92 backdrop-blur-md border-b border-line shadow-[0_1px_0_0_rgba(41,43,41,0.04)]"
            : "bg-ivory border-b border-transparent"
        }`}
      >
        {/* Subtle, restrained top ticker */}
        <div className="border-b border-line/60 bg-ivory text-charcoal/70 text-[11px] tracking-[0.14em] uppercase py-2 px-4 text-center">
          <div className="container-vuvu flex items-center justify-between">
            <span className="hidden md:inline text-muted font-normal">
              Everyday, Refined.
            </span>
            <span className="mx-auto md:mx-0 font-medium text-charcoal">
              Complimentary shipping on orders over $100
            </span>
            <span className="hidden md:inline text-muted font-normal">
              Worldwide Delivery
            </span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav
          className="container-vuvu flex items-center justify-between h-16 lg:h-20"
          aria-label="Main Navigation"
        >
          {/* Left Column: Primary editorial links */}
          <div className="flex items-center gap-8 flex-1">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden -ml-2 p-2 text-charcoal hover:text-vuvu-blue transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.14em] font-medium text-charcoal/85 hover:text-charcoal transition-colors link-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center Column: Actual VUVU wordmark */}
          <div className="flex items-center justify-center">
            <VuvuLogo variant="wordmark" size="md" preload />
          </div>

          {/* Right Column: Utility actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="p-2 text-charcoal/80 hover:text-charcoal transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 pl-2 sm:pl-3 py-2 text-charcoal hover:text-vuvu-blue transition-colors group"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <span className="relative inline-flex items-center">
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-vuvu-blue text-white text-[10px] font-medium flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="hidden sm:inline text-xs uppercase tracking-[0.14em] font-medium text-charcoal/85 group-hover:text-charcoal">
                Bag {cartCount > 0 && `(${cartCount})`}
              </span>
            </button>
          </div>
        </nav>

        {/* Dropdown Search Bar */}
        {searchOpen && (
          <div className="border-t border-line bg-white/95 backdrop-blur-md px-4 py-4 animate-[fade-in_0.2s_var(--ease-soft)]">
            <div className="container-vuvu">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 border-b border-charcoal/30 pb-2 focus-within:border-charcoal transition-colors"
              >
                <Search className="w-4 h-4 text-muted" strokeWidth={1.5} />
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, silhouettes, fabrics…"
                  className="flex-1 bg-transparent text-sm text-charcoal placeholder-muted focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-[0.14em] font-medium text-charcoal hover:text-vuvu-blue transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-muted hover:text-charcoal"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-ivory p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] animate-[fade-in_0.25s]"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-line">
                <VuvuLogo variant="wordmark" size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 text-charcoal/70 hover:text-charcoal rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Primary Links */}
              <div className="mt-8 flex flex-col space-y-5">
                <p className="eyebrow text-muted">Navigation</p>
                {PRIMARY_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl font-normal text-charcoal hover:text-vuvu-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Category Sub-nav */}
              <div className="mt-10 pt-6 border-t border-line flex flex-col space-y-3.5">
                <p className="eyebrow text-muted">Categories</p>
                {SECONDARY_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-normal text-charcoal/80 hover:text-charcoal transition-colors flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-line text-xs text-muted space-y-2">
              <p className="font-display text-charcoal font-medium">
                VUVU — Contemporary Clothing
              </p>
              <p className="text-[11px] text-muted">
                Everyday, Refined. © 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
