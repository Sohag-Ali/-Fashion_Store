"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { popularSearches } from "@/lib/navigation";

export function SearchOverlay({ isOpen, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      // Wait for the enter animation frame so autofocus doesn't fight the transition
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function goToQuery(term) {
    const trimmed = term.trim();
    onClose();
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
  }

  function handleSubmit(e) {
    e.preventDefault();
    goToQuery(query);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[70] bg-background border-b border-border shadow-luxury"
          >
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 pt-8 pb-12">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Search
                </span>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-foreground hover:text-muted-foreground transition-colors"
                  aria-label="Close search"
                >
                  <X strokeWidth={1.5} size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-4 border-b border-foreground/20 pb-4 focus-within:border-foreground transition-colors">
                <Search strokeWidth={1.5} size={24} className="text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for pieces, categories..."
                  className="w-full bg-transparent font-serif text-2xl md:text-4xl tracking-tight placeholder:text-muted-foreground/50 focus:outline-none"
                />
              </form>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground mr-2">
                  Popular:
                </span>
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => goToQuery(term)}
                    className="text-xs uppercase tracking-[0.1em] px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
