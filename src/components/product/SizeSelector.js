"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function SizeSelector({ sizes, soldOutSizes = [], selected, onSelect }) {
  return (
    <div>
      <div className="mb-3">
        <span className="text-xs uppercase tracking-[0.15em] font-medium">
          Size {selected && <span className="text-muted-foreground normal-case tracking-normal">— {selected}</span>}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSoldOut = soldOutSizes.includes(size);
          const isSelected = selected === size;
          return (
            <button
              key={size}
              disabled={isSoldOut}
              onClick={() => onSelect(size)}
              aria-pressed={isSelected}
              className={cn(
                "relative min-w-[3rem] px-4 py-2.5 text-sm border transition-all duration-200",
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 hover:border-foreground text-foreground",
                isSoldOut && "border-foreground/10 text-muted-foreground/50 cursor-not-allowed hover:border-foreground/10"
              )}
            >
              {size}
              {isSoldOut && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-[130%] h-px bg-foreground/20 rotate-[-18deg]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
