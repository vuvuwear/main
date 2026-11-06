"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-ivory border-t border-line text-charcoal">
      {/* ------------------------------------------------------------------
          Newsletter section — Scandinavian editorial treatment
          ------------------------------------------------------------------ */}
      <section
        aria-labelledby="newsletter-heading"
        className="border-b border-line py-16 sm:py-24"
      >
        <div className="container-vuvu">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow text-muted block mb-3">Newsletter</span>
            <h2
              id="newsletter-heading"
              className="display text-3xl sm:text-4xl text-charcoal"
            >
              STAY IN THE KNOW.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
              Discover new collections, releases, and stories from VUVU.
            </p>

            <div className="mt-8">
              {subscribed ? (
                <div className="inline-flex items-center gap-2.5 bg-white border border-stone px-5 py-3 text-xs text-charcoal">
                  <Check className="w-4 h-4 text-vuvu-blue" />
                  <span>You are subscribed to the VUVU newsletter.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="field flex-1 bg-white text-xs sm:text-sm"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary sm:w-auto"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Main navigation grid
          ------------------------------------------------------------------ */}
      <div className="container-vuvu py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column — 4 columns */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <VuvuLogo variant="stacked" size="md" />
              <p className="mt-6 text-xs text-muted leading-relaxed max-w-sm">
                VUVU represents contemporary everyday clothing with a focus on
                simplicity, comfort, considered design, and timeless
                aesthetics.
              </p>
              <p className="mt-4 text-xs font-medium text-charcoal">
                EVERYDAY, REFINED.
              </p>
            </div>
            <div className="mt-8 text-[11px] text-muted">
              Designed with Scandinavian minimalism and contemporary creative
              identity.
            </div>
          </div>

          {/* Shop Column — 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-charcoal mb-4">Shop</h3>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <Link
                  href="/#products"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  All Items
                </Link>
              </li>
              <li>
                <Link
                  href="/#tees"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Tees & Tops
                </Link>
              </li>
              <li>
                <Link
                  href="/#hoodies"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  href="/#pants"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Trousers
                </Link>
              </li>
              <li>
                <Link
                  href="/#jackets"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/#accessories"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column — 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-charcoal mb-4">About VUVU</h3>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <Link
                  href="/#about"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Brand Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#philosophy"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/#campaign"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Current Campaign
                </Link>
              </li>
              <li>
                <Link
                  href="/#fabrics"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Materials & Craft
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Services — 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-charcoal mb-4">Client Care</h3>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <Link
                  href="/#shipping"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/#returns"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/#size-guide"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <a
                  href="mailto:care@vuvuwear.com"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Social — 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-charcoal mb-4">Connect</h3>
            <ul className="space-y-2.5 text-xs text-muted">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-charcoal transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-charcoal transition-colors"
                >
                  <span>Pinterest</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-charcoal transition-colors link-underline"
                >
                  Studio Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-muted">
          <div>
            © 2026 VUVU. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-charcoal transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-charcoal transition-colors">
              Terms & Conditions
            </span>
            <span className="text-stone">•</span>
            <span className="text-charcoal font-medium">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
