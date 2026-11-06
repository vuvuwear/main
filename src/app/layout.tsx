import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vuvuwear.com"
  ),
  title: {
    default: "VUVU — Everyday, Refined.",
    template: "%s | VUVU",
  },
  description:
    "VUVU makes considered, contemporary essentials for everyday living. Timeless silhouettes, comfortable fabrics, thoughtful design.",
  applicationName: "VUVU",
  openGraph: {
    title: "VUVU — Everyday, Refined.",
    description: "Considered essentials. Made for everyday living.",
    siteName: "VUVU",
    type: "website",
    images: [{ url: "/brand/vuvu-stacked.png", width: 800, height: 632, alt: "VUVU" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F0E9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        {children}
      </body>
    </html>
  );
}
