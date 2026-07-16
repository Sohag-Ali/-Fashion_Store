"use client";

import React, { Suspense, useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";
import { getOnSaleProducts, sortProducts, SORT_OPTIONS } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeletonGrid } from "@/components/product/ProductCardSkeleton";
import { SaleHero } from "@/components/sale/SaleHero";
import { SaleFilters } from "@/components/sale/SaleFilters";

const SCROLL_TARGET_ID = "sale-products";

export default function SalePage() {
  return (
    <Suspense fallback={null}>
      <SalePageContent />
    </Suspense>
  );
}

function SalePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local dummy data only — no fetch, no backend. This is the entire
  // product-sourcing surface for the page.
  const allSaleProducts = useMemo(() => getOnSaleProducts(), []);
  const maxDiscount = useMemo(
    () => (allSaleProducts.length ? Math.max(...allSaleProducts.map((p) => p.discount)) : 0),
    [allSaleProducts]
  );

  const [minDiscount, setMinDiscount] = useState(() => {
    const parsed = parseInt(searchParams.get("minDiscount"), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  });
  // Biggest-savings-first is the natural default sort for a sale page,
  // unlike the general Shop page which defaults to Newest.
  const [sortKey, setSortKey] = useState(searchParams.get("sort") ?? SORT_OPTIONS.DISCOUNT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  function syncParams(next) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  function handleMinDiscountChange(tier) {
    setMinDiscount(tier);
    syncParams({ minDiscount: tier === 0 ? null : tier });
  }

  function handleSortChange(value) {
    setSortKey(value);
    syncParams({ sort: value === SORT_OPTIONS.DISCOUNT ? null : value });
  }

  function handleClearFilters() {
    setMinDiscount(0);
    setSortKey(SORT_OPTIONS.DISCOUNT);
    router.replace(pathname, { scroll: false });
  }

  const filteredProducts = useMemo(() => {
    const result = allSaleProducts.filter((product) => product.discount >= minDiscount);
    return sortProducts(result, sortKey);
  }, [allSaleProducts, minDiscount, sortKey]);

  return (
    <main className="flex-1 w-full bg-background min-h-screen selection:bg-primary selection:text-primary-foreground">
      <SaleHero productCount={allSaleProducts.length} maxDiscount={maxDiscount} scrollTargetId={SCROLL_TARGET_ID} />

      <div id={SCROLL_TARGET_ID} className="scroll-mt-20 pt-20 pb-24 max-w-[1600px] mx-auto px-6">
        <SaleFilters
          minDiscount={minDiscount}
          onMinDiscountChange={handleMinDiscountChange}
          sortKey={sortKey}
          onSortChange={handleSortChange}
          resultCount={filteredProducts.length}
        />

        <div className="min-h-[400px]">
          {isLoading ? (
            <ProductCardSkeletonGrid count={Math.min(allSaleProducts.length, 6) || 6} />
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center pt-24"
            >
              <Tag className="w-12 h-12 text-muted-foreground/30 mb-6" strokeWidth={1.25} />
              <h3 className="font-serif text-3xl mb-4">No pieces at this discount</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                We could not find any sale pieces marked down that much right now. Try a lower discount filter to
                see more.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-8 px-8 py-3 border border-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                View All Sale Pieces
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
