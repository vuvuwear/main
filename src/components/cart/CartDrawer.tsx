"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

const FREE_SHIPPING_THRESHOLD = 100;

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getCartTotal,
    getItemCount,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#315074]" />
            <h2 className="text-base font-bold uppercase tracking-wider text-black">
              Shopping Bag ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-gray-500 hover:text-black hover:bg-[#F1F9FE] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-3.5 bg-[#F1F9FE] border-b border-[#315074]/15">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span className="text-[#315074]">
                Add <span className="font-bold text-black">${remainingForFreeShipping.toFixed(2)}</span> more for Free Shipping
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                ✓ Free Worldwide Shipping Unlocked!
              </span>
            )}
            <span className="text-[11px] text-[#315074]/80 font-mono">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#315074]/10">
            <div
              className="h-full bg-[#315074] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F1F9FE] flex items-center justify-center text-[#315074] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                Your Bag is Empty
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Looks like you haven't added any pieces to your bag yet.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 bg-[#315074] text-white px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-none hover:bg-[#223750] transition-colors"
              >
                Shop New Arrivals
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 bg-[#F1F9FE] flex-shrink-0 overflow-hidden rounded border border-gray-100">
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
                      <h4 className="text-sm font-semibold text-black leading-snug line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variant tags */}
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1 font-medium">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block"
                          style={{ backgroundColor: item.selectedColorHex }}
                        />
                        {item.selectedColor}
                      </span>
                      <span>•</span>
                      <span className="font-mono uppercase font-semibold text-black bg-[#F1F9FE] px-1.5 py-0.5 rounded text-[11px]">
                        Size: {item.selectedSize}
                      </span>
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold font-mono text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-black font-mono">
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
          <div className="border-t border-gray-100 bg-[#F1F9FE]/60 px-6 py-5">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-base font-mono text-black">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
              <span>Shipping & taxes</span>
              <span>Calculated at checkout</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-[#000000] hover:bg-[#315074] text-white font-bold py-3.5 px-4 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors duration-200 shadow-md group"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#315074]" />
              <span>Encrypted 256-bit checkout • Free returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

