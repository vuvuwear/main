import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VUVU | Contemporary Fashion & Essentials",
  description: "Official store for VUVU. Modern silhouettes, premium heavyweight fabrics, and elevated streetwear aesthetics.",
  icons: {
    icon: "/images/logo/vuvu-logo.png",
    apple: "/images/logo/vuvu-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#315074" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-[#315074] selection:text-white">
        {children}
      </body>
    </html>
  );
}
