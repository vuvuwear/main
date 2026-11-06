"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useMounted } from "@/lib/useMounted";

const FREE_SHIPPING_THRESHOLD = 100;

export default function CartDrawer() {
  const mounted = useMounted();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getCartTotal,
    getItemCount,
  } = useCartStore();

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const total = getCartTotal();
  const itemCount = getItemCount();
  const progressPercent = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line bg-ivory">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-vuvu-blue" strokeWidth={1.5} />
            <h2 className="eyebrow text-charcoal">
              Shopping Bag ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 -mr-1.5 text-muted hover:text-charcoal transition-colors rounded-full"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-3.5 bg-white border-b border-line">
          <div className="flex justify-between items-center text-xs mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span className="text-muted">
                Add <span className="font-mono text-charcoal font-medium">${remainingForFreeShipping.toFixed(2)}</span> for free shipping
              </span>
            ) : (
              <span className="text-vuvu-blue font-medium">
                Complimentary shipping unlocked
              </span>
            )}
            <span className="text-[11px] text-muted font-mono">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-1 bg-stone/40 overflow-hidden">
            <div
              className="h-full bg-vuvu-blue transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-line">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-full bg-white border border-line flex items-center justify-center text-muted mb-4">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-base text-charcoal">
                Your bag is empty
              </h3>
              <p className="text-xs text-muted mt-1 max-w-xs leading-relaxed">
                Explore our current collection of considered essentials.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 btn btn-primary text-xs"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 bg-white flex-shrink-0 overflow-hidden border border-line">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-display text-sm font-normal text-charcoal leading-snug line-clamp-1 hover:text-vuvu-blue transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted hover:text-charcoal transition-colors p-0.5"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Variant tags */}
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone inline-block"
                          style={{ backgroundColor: item.selectedColorHex }}
                        />
                        {item.selectedColor}
                      </span>
                      <span className="text-stone">•</span>
                      <span className="font-mono text-[11px] text-charcoal uppercase">
                        Size: {item.selectedSize}
                      </span>
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-2">
                    <div className="flex items-center border border-stone bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-muted hover:text-charcoal hover:bg-ivory transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                      <span className="px-3 text-xs font-mono font-medium text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-muted hover:text-charcoal hover:bg-ivory transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                    </div>

                    <span className="text-sm font-medium font-mono text-charcoal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-line bg-white px-6 py-5">
            <div className="flex justify-between items-baseline text-sm mb-1">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono font-medium text-base text-charcoal">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-muted mb-4">
              Taxes and shipping calculated at checkout.
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary w-full"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <p className="text-center text-[11px] text-muted mt-3">
              Complimentary 30-day returns on all orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
