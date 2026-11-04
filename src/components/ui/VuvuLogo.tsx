"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface VuvuLogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  animatedOnHover?: boolean;
  className?: string;
}

const frames = [
  "/images/logo/frame_00001.png",
  "/images/logo/frame_00002.png",
  "/images/logo/frame_00003.png",
  "/images/logo/frame_00004.png",
  "/images/logo/frame_00005.png",
  "/images/logo/frame_00006.png",
  "/images/logo/frame_00007.png",
  "/images/logo/frame_00008.png",
];

export default function VuvuLogo({
  size = "md",
  withText = true,
  animatedOnHover = true,
  className = "",
}: VuvuLogoProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered || !animatedOnHover) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 90);

    return () => clearInterval(interval);
  }, [isHovered, animatedOnHover]);

  const sizeDimensions = {
    sm: { width: 32, height: 32, textClass: "text-lg tracking-widest" },
    md: { width: 44, height: 44, textClass: "text-2xl tracking-[0.25em]" },
    lg: { width: 64, height: 64, textClass: "text-4xl tracking-[0.3em]" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group select-none transition-transform active:scale-95 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentFrame(0);
      }}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-lg bg-[#F1F9FE] p-1 border border-[#315074]/15 shadow-sm transition-all duration-300 group-hover:border-[#315074] group-hover:shadow-md"
        style={{
          width: sizeDimensions.width + 10,
          height: sizeDimensions.height + 10,
        }}
      >
        <Image
          src={frames[currentFrame]}
          alt="VUVU Logo"
          width={sizeDimensions.width}
          height={sizeDimensions.height}
          className="object-contain transition-transform duration-200 group-hover:scale-105"
          priority
        />
      </div>

      {withText && (
        <div className="flex flex-col">
          <span
            className={`font-black font-sans uppercase text-black group-hover:text-[#315074] transition-colors leading-none ${sizeDimensions.textClass}`}
          >
            VUVU
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#315074] font-semibold mt-0.5">
            Wear
          </span>
        </div>
      )}
    </Link>
  );
}

