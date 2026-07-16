import React from "react";
import { cn } from "@/lib/utils";

/**
 * Loading placeholder for <ProductCard>. Mirrors its DOM structure
 * (image block, badge/wishlist/button placeholders, title/brand/rating/price
 * row) exactly, at the same sizes, so a grid never jumps when real product
 * data replaces the skeletons.
 */
export function ProductCardSkeleton({ size = "default" }) {
  const isCompact = size === "compact";

  return (
    <div className="flex flex-col" aria-hidden="true">
      <div className="aspect-[3/4] relative overflow-hidden mb-6 shimmer">
        {/* Badge placeholder (New / Sale) */}
        <div className="absolute top-3 left-3 h-5 w-12 rounded-sm bg-background/60" />
        {/* Wishlist icon placeholder */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/60" />
        {/* Quick add button placeholder */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[120px] h-11 rounded-full bg-background/70" />
      </div>

      <div className="flex justify-between items-start pt-2 px-1 gap-3">
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          {/* Title */}
          <div className={cn("shimmer rounded-sm", isCompact ? "h-4 w-4/5" : "h-5 w-3/4")} />
          {/* Brand */}
          <div className={cn("shimmer rounded-sm", isCompact ? "h-2.5 w-1/3" : "h-3 w-2/5")} />
          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="shimmer rounded-sm h-3 w-16" />
            <div className="shimmer rounded-sm h-3 w-6" />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="shimmer rounded-sm h-4 w-12" />
        </div>
      </div>
    </div>
  );
}

/** Convenience wrapper: N skeleton cards dropped into the same responsive grid used for real product results. */
export function ProductCardSkeletonGrid({ count = 6, size = "default", className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} size={size} />
      ))}
    </div>
  );
}
