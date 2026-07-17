"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ColorSelector({ colors, selected, onSelect }) {
  const selectedColor = colors.find((color) => color.name === selected);

  return (
    <div>
      <div className="mb-3">
        <span className="text-xs uppercase tracking-[0.15em] font-medium">
          Color {selectedColor && <span className="text-muted-foreground normal-case tracking-normal">— {selectedColor.name}</span>}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selected === color.name;
          return (
            <button
              key={color.name}
              onClick={() => onSelect(color.name)}
              aria-label={color.name}
              aria-pressed={isSelected}
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full ring-1 ring-offset-2 ring-offset-background transition-all duration-200",
                  isSelected ? "ring-primary" : "ring-transparent"
                )}
              />
              <span
                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center"
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    className={cn(
                      isLightColor(color.hex) ? "text-black/70" : "text-white/90"
                    )}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function isLightColor(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
