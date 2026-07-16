"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { SORT_OPTIONS, SORT_LABELS } from "@/lib/products";
import { cn } from "@/lib/utils";

const SORT_ORDER = [
  SORT_OPTIONS.NEWEST,
  SORT_OPTIONS.POPULAR,
  SORT_OPTIONS.RATING,
  SORT_OPTIONS.PRICE_LOW,
  SORT_OPTIONS.PRICE_HIGH,
];

export function ShopFilters({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
  searchQuery,
  onSearchChange,
  sortKey,
  onSortChange,
  priceRange,
  priceBounds,
  onPriceChange,
  hasActiveFilters,
  onClearFilters,
}) {
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="sticky top-[64px] md:top-[80px] bg-background/80 backdrop-blur-xl z-40 border-t border-b border-foreground/10 py-6 mb-16"
    >
      {/* Category pills */}
      <div className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar">
        <CategoryPill
          label="All"
          active={selectedCategory === "all"}
          onClick={() => onCategoryChange("all")}
        />
        {categories.map((category) => (
          <CategoryPill
            key={category.slug}
            label={`${category.name} (${category.productCount})`}
            active={selectedCategory === category.slug}
            onClick={() => onCategoryChange(category.slug)}
          />
        ))}
      </div>

      {/* Subcategory pills — only once a parent category is chosen, so a
          subcategory slug is never ambiguous across categories. */}
      <AnimatePresence initial={false}>
        {selectedCategory !== "all" && subCategories.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex overflow-x-auto pt-1 pb-4 gap-5 hide-scrollbar">
              <CategoryPill
                label="All"
                subtle
                active={selectedSubCategory === "all"}
                onClick={() => onSubCategoryChange("all")}
              />
              {subCategories.map((sub) => (
                <CategoryPill
                  key={sub.slug}
                  label={`${sub.name} (${sub.productCount})`}
                  subtle
                  active={selectedSubCategory === sub.slug}
                  onClick={() => onSubCategoryChange(sub.slug)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search / price / sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        <div className="relative group flex-1 sm:max-w-[220px]">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input
            id="product-search"
            type="text"
            placeholder="Search pieces..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent border-b border-foreground/20 py-2 pl-8 pr-4 text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {/* Price filter */}
        <div className="relative">
          <button
            onClick={() => setIsPriceOpen((open) => !open)}
            className={cn(
              "flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-widest transition-colors duration-300",
              isPriceOpen || priceRange.min !== priceBounds.min || priceRange.max !== priceBounds.max
                ? "border-foreground text-foreground"
                : "border-foreground/20 text-muted-foreground hover:border-foreground/50"
            )}
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Price
          </button>
          <AnimatePresence>
            {isPriceOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full mt-2 w-64 border border-foreground/10 bg-background p-5 shadow-luxury z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest font-medium">Price Range</span>
                  <button
                    onClick={() => setIsPriceOpen(false)}
                    aria-label="Close price filter"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <PriceInput
                    label="Min"
                    value={priceRange.min}
                    bound={priceBounds.min}
                    onCommit={(value) => onPriceChange({ ...priceRange, min: Math.min(value, priceRange.max) })}
                  />
                  <span className="text-muted-foreground text-xs mt-4">—</span>
                  <PriceInput
                    label="Max"
                    value={priceRange.max}
                    bound={priceBounds.max}
                    onCommit={(value) => onPriceChange({ ...priceRange, max: Math.max(value, priceRange.min) })}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Catalog range ${priceBounds.min} – ${priceBounds.max}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort */}
        <div className="relative group">
          <select
            value={sortKey}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-transparent border border-foreground/20 px-6 py-2.5 pr-12 text-xs uppercase tracking-widest cursor-pointer focus:outline-none focus:border-foreground transition-colors hover:border-foreground/50 rounded-none"
          >
            {SORT_ORDER.map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors sm:ml-auto"
          >
            Clear Filters
          </button>
        )}
      </div>
    </motion.div>
  );
}

function CategoryPill({ label, active, onClick, subtle }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap transition-all duration-300 pb-1",
        subtle ? "text-[11px] tracking-[0.12em] uppercase" : "text-xs uppercase tracking-[0.15em]",
        active
          ? "text-foreground font-semibold border-b border-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function PriceInput({ label, value, bound, onCommit }) {
  const [draft, setDraft] = useState(String(value));

  return (
    <label className="flex-1 flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type="number"
        min={0}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onCommit(Number(draft) || bound)}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        className="w-full bg-transparent border-b border-foreground/20 py-1 text-sm focus:outline-none focus:border-foreground transition-colors tabular-nums"
      />
    </label>
  );
}
