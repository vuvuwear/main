import React, { Suspense } from "react";
import Link from "next/link";
import { Check, PackageCheck, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";

interface OrderSuccessProps {
  params: Promise<{ id: string }>;
}

async function OrderSuccessContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between">
      {/* Top Bar */}
      <header className="bg-white border-b border-line py-4 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <VuvuLogo variant="wordmark" size="sm" />
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.12em] font-medium text-muted hover:text-charcoal transition-colors link-underline"
          >
            Back to Store
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20 w-full flex-1">
        <div className="bg-white p-6 sm:p-12 border border-line">
          {/* Header Icon */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-ivory text-vuvu-blue flex items-center justify-center mx-auto mb-5 border border-stone">
              <Check className="w-6 h-6" strokeWidth={1.5} />
            </div>

            <span className="eyebrow text-vuvu-blue block mb-2">
              Order Confirmed
            </span>

            <h1 className="heading text-3xl sm:text-4xl text-charcoal">
              Thank You For Your Order
            </h1>

            <p className="text-xs sm:text-sm text-muted mt-3 max-w-md mx-auto leading-relaxed font-light">
              We have received your order. Each garment is hand-inspected and packed in our studio with recycled archival dust-wrap.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 bg-ivory border border-stone px-4 py-2 text-xs font-mono">
              <span className="text-muted">Order Reference:</span>
              <span className="font-medium text-charcoal uppercase">{id}</span>
            </div>
          </div>

          {/* Fulfillment Tracking Steps */}
          <div className="mt-12 pt-8 border-t border-line">
            <h3 className="eyebrow text-charcoal mb-6">
              Fulfillment Cadence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-ivory/70 border border-charcoal/20 flex items-start gap-3">
                <PackageCheck className="w-4 h-4 text-vuvu-blue flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                    1. Confirmed
                  </div>
                  <div className="text-[11px] text-vuvu-blue font-medium mt-0.5">
                    Order In Processing
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-line flex items-start gap-3 opacity-60">
                <Truck className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                    2. Courier Dispatch
                  </div>
                  <div className="text-[11px] text-muted mt-0.5">
                    Within 24–48 hours
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border border-line flex items-start gap-3 opacity-60">
                <ShieldCheck className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-charcoal">
                    3. Delivered
                  </div>
                  <div className="text-[11px] text-muted mt-0.5">
                    3–5 business days
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="mt-8 p-4 bg-ivory border border-line text-xs text-muted leading-relaxed">
            A confirmation receipt and live tracking link have been dispatched to your email address.
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-line">
            <Link
              href="/#products"
              className="btn btn-primary w-full sm:w-auto"
            >
              <span>Back To Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-xs text-muted">
              Client care: <a href="mailto:care@vuvuwear.com" className="text-charcoal underline">care@vuvuwear.com</a>
            </span>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-muted border-t border-line bg-white">
        VUVU — EVERYDAY, REFINED. © 2026
      </footer>
    </div>
  );
}

export default function OrderSuccessPage({ params }: OrderSuccessProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center text-xs uppercase tracking-widest text-muted">
          Loading order details…
        </div>
      }
    >
      <OrderSuccessContent params={params} />
    </Suspense>
  );
}
