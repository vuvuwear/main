"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Tag,
  CreditCard,
  Banknote,
  Lock,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import VuvuLogo from "@/components/ui/VuvuLogo";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getCartTotal();

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F1F9FE] flex items-center justify-center text-[#315074] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-black">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-sm">
          Please add garments to your bag before proceeding to checkout.
        </p>
        <Link
          href="/#products"
          className="mt-6 inline-flex items-center gap-2 bg-[#315074] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#223750] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Shop</span>
        </Link>
      </div>
    );
  }

  // Calculate pricing
  const freeShipping = subtotal >= 100;
  const shippingCost = shippingMethod === "express" ? 18 : freeShipping ? 0 : 10;
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscountError("");
    if (promoCode.trim().toUpperCase() === "VUVU10") {
      setAppliedDiscount(10);
      setDiscountError("");
    } else if (promoCode.trim().toUpperCase() === "DROP01") {
      setAppliedDiscount(15);
      setDiscountError("");
    } else {
      setDiscountError("Invalid promo code. Try 'VUVU10' for 10% off.");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate simulated order ID
    const randomOrderId = `VUVU-${Math.floor(100000 + Math.random() * 900000)}`;

    // Store order details in sessionStorage for the success page
    const orderReceipt = {
      orderId: randomOrderId,
      items,
      subtotal,
      shippingCost,
      discountAmount,
      total,
      shippingAddress: formData,
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card (Stripe)",
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("vuvu_latest_order", JSON.stringify(orderReceipt));
    }

    setTimeout(() => {
      clearCart();
      router.push(`/order-success/${randomOrderId}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F1F9FE]">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <VuvuLogo size="sm" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </header>

      {/* Main Checkout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-gray-100">
              <h2 className="text-base font-bold uppercase tracking-wider text-black flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#315074] text-white flex items-center justify-center text-xs font-mono">
                  1
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Email Address (For Order Updates) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="hazem@example.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Mobile Phone Number (For Courier Delivery) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-gray-100">
              <h2 className="text-base font-bold uppercase tracking-wider text-black flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#315074] text-white flex items-center justify-center text-xs font-mono">
                  2
                </span>
                <span>Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="123 Atelier Street"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Postal / Zip Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleFormChange}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-gray-100">
              <h2 className="text-base font-bold uppercase tracking-wider text-black flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#315074] text-white flex items-center justify-center text-xs font-mono">
                  3
                </span>
                <span>Shipping Method</span>
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    shippingMethod === "standard"
                      ? "border-[#315074] bg-[#F1F9FE]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="accent-[#315074]"
                    />
                    <div>
                      <div className="text-xs font-bold uppercase text-black">
                        Tracked Standard Delivery
                      </div>
                      <div className="text-[11px] text-gray-500">
                        3–5 Business Days • Global Courier Tracking
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#315074]">
                    {freeShipping ? "FREE" : "$10.00"}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    shippingMethod === "express"
                      ? "border-[#315074] bg-[#F1F9FE]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="accent-[#315074]"
                    />
                    <div>
                      <div className="text-xs font-bold uppercase text-black">
                        Express Priority Courier
                      </div>
                      <div className="text-[11px] text-gray-500">
                        1–2 Business Days • Hand-Dispatched
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-black">
                    $18.00
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-gray-100">
              <h2 className="text-base font-bold uppercase tracking-wider text-black flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#315074] text-white flex items-center justify-center text-xs font-mono">
                  4
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-lg border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === "card"
                      ? "border-[#315074] bg-[#F1F9FE] ring-1 ring-[#315074]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#315074]" />
                  <div>
                    <div className="text-xs font-bold uppercase text-black">
                      Credit / Debit Card
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Stripe, Apple Pay, Visa, MC
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-lg border text-left flex items-center gap-3 transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#315074] bg-[#F1F9FE] ring-1 ring-[#315074]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#315074]" />
                  <div>
                    <div className="text-xs font-bold uppercase text-black">
                      Cash on Delivery (COD)
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Pay cash upon delivery
                    </div>
                  </div>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="•••• •••• •••• ••••"
                      required={paymentMethod === "card"}
                      value={formData.cardNumber}
                      onChange={handleFormChange}
                      className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM / YY"
                        required={paymentMethod === "card"}
                        value={formData.cardExpiry}
                        onChange={handleFormChange}
                        className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                        CVC Code *
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        placeholder="123"
                        required={paymentMethod === "card"}
                        value={formData.cardCvc}
                        onChange={handleFormChange}
                        className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="p-4 rounded bg-[#F1F9FE] text-xs text-gray-600 leading-relaxed">
                  ✓ <strong>No upfront online payment required.</strong> You will pay the courier in cash when your Vuvu package arrives at your doorstep. Please ensure the exact amount is prepared.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-gray-100 sticky top-24">
              <h3 className="text-base font-bold uppercase tracking-wider text-black pb-4 border-b border-gray-100 mb-4">
                Order Summary ({items.length})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto mb-6 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3">
                    <div className="relative w-16 h-20 bg-[#F1F9FE] rounded overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-black line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {item.selectedColor} • Size: {item.selectedSize}
                        </div>
                      </div>
                      <div className="text-xs font-bold font-mono text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pb-6 border-b border-gray-100 mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (try VUVU10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#F1F9FE] border border-gray-200 rounded pl-8 pr-3 py-2 text-xs uppercase text-black placeholder-gray-400 focus:outline-none focus:border-[#315074]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-black hover:bg-[#315074] text-white px-4 py-2 text-xs uppercase tracking-wider font-bold rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{appliedDiscount}% discount applied!</span>
                  </div>
                )}
                {discountError && (
                  <div className="mt-2 text-xs text-rose-600">
                    {discountError}
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 text-xs text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono font-bold text-black">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-mono text-gray-500">Included</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline text-sm">
                  <span className="font-bold uppercase tracking-wider text-black">
                    Total
                  </span>
                  <span className="text-xl font-black font-mono text-[#315074]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#000000] hover:bg-[#315074] text-white font-bold py-4 px-4 text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 shadow-md group disabled:opacity-50"
              >
                <Lock className="w-4 h-4 text-[#F1F9FE]" />
                <span>
                  {isSubmitting
                    ? "Securing Order..."
                    : `Complete Order • $${total.toFixed(2)}`}
                </span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#315074]" />
                <span>Encrypted 256-Bit SSL • 30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

