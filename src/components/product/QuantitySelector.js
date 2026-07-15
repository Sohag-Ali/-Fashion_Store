"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector({ quantity, onChange, max = 10 }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.15em] font-medium mb-3 block">Quantity</span>
      <div className="inline-flex items-center border border-foreground/20">
        <button
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span className="w-10 text-center text-sm tabular-nums select-none">{quantity}</span>
        <button
          onClick={() => onChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
