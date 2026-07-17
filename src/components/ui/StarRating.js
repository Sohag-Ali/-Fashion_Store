import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating = 0, size = 14, className }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - (i - 1)));
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star strokeWidth={1.5} size={size} className="absolute inset-0 text-muted-foreground/40" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star strokeWidth={1.5} size={size} className="text-gold fill-gold" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
