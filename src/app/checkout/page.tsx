"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Tag,
  CreditCard,
  Banknote,
  Lock,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useMounted } from "@/lib/useMounted";
import VuvuLogo from "@/components/ui/VuvuLogo";

function generateOrderNumber(): string {
  return `VUVU-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useMounted();
  const { items, getCartTotal, clearCart } = useCartStore();

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

  if (!mounted) return null;

  const subtotal = getCartTotal();

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col justify-center items-center p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-white border border-line flex items-center justify-center text-muted mb-4">
          <ShoppingBag className="w-6 h-6 text-vuvu-blue" strokeWidth={1.5} />
        </div>
        <h2 className="heading text-2xl sm:text-3xl text-charcoal">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-2 max-w-sm leading-relaxed">
          Please add garments to your bag before proceeding to checkout.
        </p>
        <Link
          href="/#products"
          className="mt-6 btn btn-primary text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
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
    const cleaned = promoCode.trim().toUpperCase();
    if (cleaned === "VUVU10") {
      setAppliedDiscount(10);
      setDiscountError("");
    } else if (cleaned === "DROP01") {
      setAppliedDiscount(15);
      setDiscountError("");
    } else {
      setDiscountError("Invalid code. Try 'VUVU10' for 10% off.");
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate readable order reference
    const randomOrderId = generateOrderNumber();

    const orderReceipt = {
      orderId: randomOrderId,
      items,
      subtotal,
      shippingCost,
      discountAmount,
      total,
      shippingAddress: formData,
      paymentMethod:
        paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card (Stripe)",
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "vuvu_latest_order",
        JSON.stringify(orderReceipt)
      );
    }

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: randomOrderId,
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData,
          items,
          subtotal,
          shippingCost,
          discountAmount,
          total,
          paymentMethod:
            paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card (Stripe)",
        }),
      });
    } catch (err) {
      console.error("Failed to persist order to database:", err);
    }

    clearCart();
    router.push(`/order-success/${randomOrderId}`);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Checkout Minimal Header */}
      <header className="bg-white border-b border-line py-4 px-4 sm:px-8">
        <div className="container-vuvu flex items-center justify-between">
          <VuvuLogo variant="wordmark" size="sm" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium text-muted hover:text-charcoal transition-colors link-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </header>

      {/* Main Checkout Container */}
      <div className="container-vuvu py-10 lg:py-16">
        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 border border-line">
              <h2 className="eyebrow text-charcoal flex items-center gap-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] font-mono">
                  1
                </span>
                <span>Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="field-label">
                    Email Address (for order tracking) *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="field-label">
                    Mobile Phone Number (for courier dispatch) *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-line">
              <h2 className="eyebrow text-charcoal flex items-center gap-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] font-mono">
                  2
                </span>
                <span>Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="field-label">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="field-label">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="field-label">
                    Street Address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    required
                    placeholder="Street and house number"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="field-label">
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className="field-label">
                    Postal / Zip Code *
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleFormChange}
                    className="field"
                  />
                </div>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div className="bg-white p-6 sm:p-8 border border-line">
              <h2 className="eyebrow text-charcoal flex items-center gap-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] font-mono">
                  3
                </span>
                <span>Shipping Method</span>
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    shippingMethod === "standard"
                      ? "border-charcoal bg-ivory/50"
                      : "border-line hover:border-stone bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="accent-charcoal"
                    />
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                        Tracked Standard Delivery
                      </div>
                      <div className="text-[11px] text-muted">
                        3–5 business days • Global courier tracking
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-charcoal">
                    {freeShipping ? "FREE" : "$10.00"}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    shippingMethod === "express"
                      ? "border-charcoal bg-ivory/50"
                      : "border-line hover:border-stone bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="accent-charcoal"
                    />
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                        Express Priority Dispatch
                      </div>
                      <div className="text-[11px] text-muted">
                        1–2 business days • Dedicated courier
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-charcoal">
                    $18.00
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="bg-white p-6 sm:p-8 border border-line">
              <h2 className="eyebrow text-charcoal flex items-center gap-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px] font-mono">
                  4
                </span>
                <span>Payment</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border text-left flex items-center gap-3 transition-colors ${
                    paymentMethod === "card"
                      ? "border-charcoal bg-ivory/50"
                      : "border-line hover:border-stone bg-white"
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-vuvu-blue" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                      Credit / Debit Card
                    </div>
                    <div className="text-[11px] text-muted">
                      Stripe, Apple Pay, Visa, MC
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border text-left flex items-center gap-3 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-charcoal bg-ivory/50"
                      : "border-line hover:border-stone bg-white"
                  }`}
                >
                  <Banknote className="w-4 h-4 text-vuvu-blue" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                      Cash on Delivery
                    </div>
                    <div className="text-[11px] text-muted">
                      Pay upon physical arrival
                    </div>
                  </div>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-line">
                  <div>
                    <label htmlFor="cardNumber" className="field-label">
                      Card Number *
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      placeholder="•••• •••• •••• ••••"
                      required={paymentMethod === "card"}
                      value={formData.cardNumber}
                      onChange={handleFormChange}
                      className="field font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="field-label">
                        Expiry Date *
                      </label>
                      <input
                        id="cardExpiry"
                        type="text"
                        name="cardExpiry"
                        placeholder="MM / YY"
                        required={paymentMethod === "card"}
                        value={formData.cardExpiry}
                        onChange={handleFormChange}
                        className="field font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="field-label">
                        CVC Code *
                      </label>
                      <input
                        id="cardCvc"
                        type="text"
                        name="cardCvc"
                        placeholder="123"
                        required={paymentMethod === "card"}
                        value={formData.cardCvc}
                        onChange={handleFormChange}
                        className="field font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="p-4 bg-ivory border border-line text-xs text-muted leading-relaxed">
                  ✓ <strong>No upfront online payment required.</strong> Pay the courier in cash when your VUVU order arrives.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-line sticky top-24">
              <h3 className="eyebrow text-charcoal pb-4 border-b border-line mb-4">
                Order Summary ({items.length})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-line max-h-72 overflow-y-auto mb-6 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3">
                    <div className="relative w-16 h-20 bg-ivory overflow-hidden flex-shrink-0 border border-line">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-1 right-1 bg-charcoal text-white text-[10px] font-mono font-medium w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-xs font-normal text-charcoal line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-muted mt-0.5">
                          {item.selectedColor} • Size: {item.selectedSize}
                        </div>
                      </div>
                      <div className="text-xs font-mono font-medium text-charcoal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pb-6 border-b border-line mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3.5 text-muted" strokeWidth={1.5} />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VUVU10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="field pl-8 uppercase text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="btn btn-outline text-xs px-4"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <div className="mt-2 text-xs text-vuvu-blue font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{appliedDiscount}% promotional discount applied</span>
                  </div>
                )}
                {discountError && (
                  <div className="mt-2 text-xs text-red-600">
                    {discountError}
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 text-xs text-muted mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-charcoal font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-vuvu-blue font-medium">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-charcoal font-medium">
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-mono text-muted">Included</span>
                </div>

                <div className="pt-3 border-t border-line flex justify-between items-baseline text-sm">
                  <span className="font-medium uppercase tracking-wider text-charcoal">
                    Total
                  </span>
                  <span className="text-xl font-normal font-mono text-charcoal">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Complete Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                <span>
                  {isSubmitting
                    ? "Processing Order..."
                    : `Complete Order • $${total.toFixed(2)}`}
                </span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-vuvu-blue" strokeWidth={1.5} />
                <span>256-Bit Encrypted Checkout • Complimentary Returns</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
