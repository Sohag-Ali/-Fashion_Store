"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS, SORT_LABELS } from "@/lib/products";
import { cn } from "@/lib/utils";

const SORT_ORDER = [
  SORT_OPTIONS.DISCOUNT,
  SORT_OPTIONS.NEWEST,
  SORT_OPTIONS.POPULAR,
  SORT_OPTIONS.RATING,
  SORT_OPTIONS.PRICE_LOW,
  SORT_OPTIONS.PRICE_HIGH,
];

export const DISCOUNT_TIERS = [20, 30, 40, 50];

export function SaleFilters({ minDiscount, onMinDiscountChange, sortKey, onSortChange, resultCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="sticky top-[64px] md:top-[80px] bg-background/80 backdrop-blur-xl z-40 border-t border-b border-foreground/10 py-6 mb-16 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-4 justify-between"
    >
      {/* Discount tier chips */}
      <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-6 hide-scrollbar">
        <DiscountPill label="All" active={minDiscount === 0} onClick={() => onMinDiscountChange(0)} />
        {DISCOUNT_TIERS.map((tier, index) => (
          <DiscountPill
            key={tier}
            label={index === DISCOUNT_TIERS.length - 1 ? `${tier}%+` : `${tier}% Off`}
            active={minDiscount === tier}
            onClick={() => onMinDiscountChange(tier)}
          />
        ))}
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <span className="text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap hidden md:inline">
          {resultCount} {resultCount === 1 ? "Piece" : "Pieces"}
        </span>

        <div className="relative group">
          <select
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-background border border-foreground/20 px-6 py-2.5 pr-12 text-xs uppercase tracking-widest cursor-pointer focus:outline-none focus:border-foreground transition-colors hover:border-foreground/50 rounded-none"
          >
            {SORT_ORDER.map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

function DiscountPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "whitespace-nowrap text-xs uppercase tracking-[0.15em] transition-all duration-300 pb-1",
        active
          ? "text-foreground font-semibold border-b border-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
