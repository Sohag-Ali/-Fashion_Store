"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Builds a compact page list with ellipses, e.g. for page 7 of 20:
 * [1, "ellipsis", 6, 7, 8, "ellipsis", 20]
 */
function getPageRange(current, total, siblingCount = 1) {
  const totalVisible = siblingCount * 2 + 5; // first + last + current + siblings + 2 ellipses
  if (total <= totalVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(current - siblingCount, 2);
  const right = Math.min(current + siblingCount, total - 1);

  const pages = [1];
  if (left > 2) pages.push("ellipsis-left");
  for (let page = left; page <= right; page += 1) pages.push(page);
  if (right < total - 1) pages.push("ellipsis-right");
  pages.push(total);

  return pages;
}

/**
 * Reusable, accessible pagination control. Purely presentational — the
 * caller owns the actual data slicing, so it works identically over local
 * arrays or a future paginated API response.
 *
 * Scrolls to `scrollTarget` (default: window top) whenever `currentPage`
 * changes, skipping the very first render so a deep link to e.g. ?page=3
 * doesn't yank the viewport on load.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  scrollToTop = true,
  scrollTarget,
  className,
}) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!scrollToTop) return;

    if (scrollTarget?.current) {
      scrollTarget.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, scrollToTop, scrollTarget]);

  if (totalPages <= 1) return null;

  function goTo(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  }

  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-2 sm:gap-3", className)}>
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 border border-foreground/15 text-foreground transition-all duration-300",
          currentPage === 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:border-foreground hover:bg-foreground hover:text-background"
        )}
      >
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>

      <ul className="flex items-center gap-1 sm:gap-2">
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <li key={page}>
              <button
                type="button"
                onClick={() => goTo(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  "relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-sm tabular-nums transition-colors duration-300",
                  page === currentPage ? "text-background" : "text-foreground hover:text-muted-foreground"
                )}
              >
                {page === currentPage && (
                  <motion.span
                    layoutId="paginationActiveIndicator"
                    className="absolute inset-0 bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{page}</span>
              </button>
            </li>
          ) : (
            <li
              key={`${page}-${index}`}
              aria-hidden="true"
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-muted-foreground/50"
            >
              <MoreHorizontal size={16} strokeWidth={1.5} />
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={cn(
          "flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 border border-foreground/15 text-foreground transition-all duration-300",
          currentPage === totalPages
            ? "opacity-30 cursor-not-allowed"
            : "hover:border-foreground hover:bg-foreground hover:text-background"
        )}
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
