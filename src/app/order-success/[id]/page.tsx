import React, { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, PackageCheck, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";

interface OrderSuccessProps {
  params: Promise<{ id: string }>;
}

async function OrderSuccessContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#F1F9FE] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <VuvuLogo size="sm" />
          <Link
            href="/"
            className="text-xs uppercase tracking-wider font-semibold text-gray-500 hover:text-black transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16 w-full flex-1">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
          {/* Header Icon */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#315074]">
              ORDER CONFIRMED
            </span>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black mt-2">
              Thank You For Your Order
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
              We have received your order. Our atelier is now hand-inspecting and packing your garments with our signature branded dust-bags.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 bg-[#F1F9FE] border border-[#315074]/15 px-4 py-2 rounded-lg font-mono text-xs">
              <span className="text-gray-500">Order Reference:</span>
              <span className="font-bold text-black uppercase">{id}</span>
            </div>
          </div>

          {/* Fulfillment Tracking Steps */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-6">
              Delivery Progress
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#F1F9FE] border border-[#315074]/20 flex items-start gap-3">
                <PackageCheck className="w-5 h-5 text-[#315074] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-black uppercase">
                    1. Confirmed
                  </div>
                  <div className="text-[11px] text-[#315074] font-semibold mt-0.5">
                    Order In Processing
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-3 opacity-60">
                <Truck className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-gray-700 uppercase">
                    2. Courier Dispatch
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Estimated 24-48 hrs
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-3 opacity-60">
                <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-gray-700 uppercase">
                    3. Delivered
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    3–5 Business Days
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="mt-8 p-4 rounded-lg bg-[#F1F9FE] border border-[#315074]/15 flex items-center justify-between text-xs text-gray-600">
            <div>
              <span className="font-semibold text-black">A receipt and tracking number</span> have been queued for your email address.
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#315074] hover:bg-[#223750] text-white px-8 py-3.5 text-xs uppercase tracking-widest font-bold rounded transition-colors"
            >
              <span>Back To Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <span className="text-xs text-gray-400 font-mono">
              Need assistance? Email: support@vuvuwear.com
            </span>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 font-mono">
        VUVU WEAR © 2026 • ELEVATED ESSENTIALS
      </footer>
    </div>
  );
}

export default function OrderSuccessPage({ params }: OrderSuccessProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F9FE] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#315074]">
          Loading order details...
        </div>
      }
    >
      <OrderSuccessContent params={params} />
    </Suspense>
  );
}
