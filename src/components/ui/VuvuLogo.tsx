"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface VuvuLogoProps {
  /**
   * "wordmark": horizontal VUVU logotype (/brand/vuvu-wordmark.png)
   * "stacked": 2x2 organic VUVU glyph (/brand/vuvu-stacked.png)
   */
  variant?: "wordmark" | "stacked";
  /**
   * Logical size presets. Proportions are strictly preserved.
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional custom class for the anchor / container.
   */
  className?: string;
  /**
   * Render without the link wrapper (e.g. inside an already linked area).
   */
  asLink?: boolean;
  /**
   * Accessible label. Defaults to "VUVU Home".
   */
  alt?: string;
  /**
   * Preload the logo for instant paint.
   */
  preload?: boolean;
}

const DIMENSIONS: Record<
  "wordmark" | "stacked",
  Record<"sm" | "md" | "lg" | "xl", { width: number; height: number }>
> = {
  wordmark: {
    // Aspect ratio: 1200 / 229 ≈ 5.24 : 1
    sm: { width: 92, height: 18 },
    md: { width: 120, height: 23 },
    lg: { width: 156, height: 30 },
    xl: { width: 200, height: 38 },
  },
  stacked: {
    // Aspect ratio: 800 / 632 ≈ 1.266 : 1
    sm: { width: 34, height: 27 },
    md: { width: 44, height: 35 },
    lg: { width: 64, height: 51 },
    xl: { width: 96, height: 76 },
  },
};

export default function VuvuLogo({
  variant = "wordmark",
  size = "md",
  className = "",
  asLink = true,
  alt = "VUVU",
  preload = false,
}: VuvuLogoProps) {
  const dims = DIMENSIONS[variant][size];
  const src =
    variant === "stacked"
      ? "/brand/vuvu-stacked.png"
      : "/brand/vuvu-wordmark.png";

  const image = (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      preload={preload}
      className="h-auto w-auto max-h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
      style={{
        width: dims.width,
        height: dims.height,
        aspectRatio: `${dims.width} / ${dims.height}`,
      }}
    />
  );

  if (!asLink) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href="/"
      aria-label="VUVU — Homepage"
      className={`group inline-flex items-center justify-center transition-transform active:scale-[0.98] ${className}`}
    >
      {image}
    </Link>
  );
}
