"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 3;

export function ProductReviews({ rating, reviewCount, reviews }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const breakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      counts[review.rating] = (counts[review.rating] ?? 0) + 1;
    });
    return counts;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (activeFilter === "All") return reviews;
    return reviews.filter((review) => review.rating === Number(activeFilter));
  }, [reviews, activeFilter]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);

  function handleFilterChange(filter) {
    setActiveFilter(filter);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 mb-12">
        {/* Summary */}
        <div className="flex flex-col items-start">
          <span className="text-6xl font-serif tracking-tighter mb-3">{rating.toFixed(1)}</span>
          <StarRating rating={rating} size={16} className="mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">
            Based on {reviewCount} reviews
          </p>

          <div className="flex flex-col gap-2 w-full">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = breakdown[star] ?? 0;
              const percent = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
              return (
                <button
                  key={star}
                  onClick={() => handleFilterChange(activeFilter === String(star) ? "All" : String(star))}
                  className={cn(
                    "flex items-center gap-3 text-xs group",
                    activeFilter === String(star) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="w-8 tabular-nums">{star}★</span>
                  <span className="flex-1 h-1 bg-foreground/10 overflow-hidden">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="block h-full bg-foreground"
                    />
                  </span>
                  <span className="w-8 tabular-nums text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Review list */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {["All", "5", "4", "3", "2", "1"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={cn(
                  "px-4 py-2 text-xs uppercase tracking-widest border transition-colors duration-200",
                  activeFilter === filter
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 hover:border-foreground"
                )}
              >
                {filter === "All" ? "All" : `${filter} Star`}
              </button>
            ))}
          </div>

          <div className="flex flex-col divide-y divide-foreground/10">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="py-6 first:pt-0"
                >
                  <div className="flex items-center justify-between mb-3 gap-4">
                    <StarRating rating={review.rating} size={13} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg tracking-tight mb-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                  <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide">
                    {review.author}
                    {review.verified && (
                      <span className="flex items-center gap-1 text-muted-foreground font-normal">
                        <BadgeCheck size={13} strokeWidth={1.5} />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredReviews.length === 0 && (
              <p className="py-12 text-sm text-muted-foreground text-center">
                No reviews match this filter yet.
              </p>
            )}
          </div>

          {visibleCount < filteredReviews.length && (
            <button
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="mt-4 text-xs uppercase tracking-widest underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              Load more reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
