"use client";

import React, { Suspense, useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import {
  getAllProducts,
  getCategories,
  getSubCategories,
  getCategoryBySlug,
  getPriceBounds,
  searchProducts,
  filterProducts,
  sortProducts,
  SORT_OPTIONS,
} from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allProducts = useMemo(() => getAllProducts(), []);
  const categories = useMemo(() => getCategories(), []);
  const catalogBounds = useMemo(() => getPriceBounds(allProducts), [allProducts]);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ?? "all");
  const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get("subCategory") ?? "all");
  const [sortKey, setSortKey] = useState(searchParams.get("sort") ?? SORT_OPTIONS.NEWEST);
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : catalogBounds.min,
    max: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : catalogBounds.max,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Entry-point filters driven by navbar links (New Arrivals / Best Sellers /
  // Sale) rather than the in-page filter bar, so they stay in effect
  // alongside category/search until explicitly cleared.
  const entryFilter = searchParams.get("newArrival")
    ? "new"
    : searchParams.get("bestSeller")
      ? "bestsellers"
      : searchParams.get("onSale")
        ? "sale"
        : null;

  const subCategories = useMemo(
    () => (selectedCategory !== "all" ? getSubCategories(selectedCategory) : []),
    [selectedCategory]
  );

  const activeCategory = selectedCategory !== "all" ? getCategoryBySlug(selectedCategory) : null;
  const activeSubCategory =
    selectedSubCategory !== "all" ? subCategories.find((sub) => sub.slug === selectedSubCategory) : null;

  const pageHeading =
    entryFilter === "new"
      ? "New Arrivals"
      : entryFilter === "bestsellers"
        ? "Best Sellers"
        : entryFilter === "sale"
          ? "On Sale"
          : activeSubCategory
            ? activeSubCategory.name
            : activeCategory
              ? activeCategory.name
              : "The Collection";

  function syncParams(next) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setSelectedSubCategory("all");
    syncParams({ category, subCategory: null });
  }

  function handleSubCategoryChange(subCategory) {
    setSelectedSubCategory(subCategory);
    syncParams({ subCategory });
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
    syncParams({ q: value });
  }

  function handleSortChange(value) {
    setSortKey(value);
    syncParams({ sort: value === SORT_OPTIONS.NEWEST ? null : value });
  }

  function handlePriceChange(range) {
    setPriceRange(range);
    syncParams({
      minPrice: range.min !== catalogBounds.min ? range.min : null,
      maxPrice: range.max !== catalogBounds.max ? range.max : null,
    });
  }

  function handleClearFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSortKey(SORT_OPTIONS.NEWEST);
    setPriceRange(catalogBounds);
    router.replace(pathname, { scroll: false });
  }

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedSubCategory !== "all" ||
    sortKey !== SORT_OPTIONS.NEWEST ||
    priceRange.min !== catalogBounds.min ||
    priceRange.max !== catalogBounds.max ||
    entryFilter !== null;

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = searchProducts(searchQuery, allProducts);

    result = filterProducts(result, {
      category: selectedCategory,
      subCategory: selectedSubCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });

    if (entryFilter === "new") {
      result = result.filter((product) => product.newArrival);
    } else if (entryFilter === "bestsellers") {
      result = result.filter((product) => product.bestSeller);
    } else if (entryFilter === "sale") {
      result = result.filter((product) => product.discount > 0);
    }

    return sortProducts(result, sortKey);
  }, [allProducts, searchQuery, selectedCategory, selectedSubCategory, priceRange, sortKey, entryFilter]);

  return (
    <main className="flex-1 w-full bg-background min-h-screen pt-32 pb-24 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif tracking-tighter mb-4"
          >
            {pageHeading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-sm tracking-widest uppercase font-medium"
          >
            {filteredAndSortedProducts.length} Pieces
          </motion.p>
        </div>

        <ShopFilters
          categories={categories}
          subCategories={subCategories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onCategoryChange={handleCategoryChange}
          onSubCategoryChange={handleSubCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortKey={sortKey}
          onSortChange={handleSortChange}
          priceRange={priceRange}
          priceBounds={catalogBounds}
          onPriceChange={handlePriceChange}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Product Grid / States */}
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex flex-col animate-pulse">
                  <div className="aspect-[3/4] bg-muted mb-6 w-full" />
                  <div className="flex justify-between items-start pt-2 px-1">
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="h-4 bg-muted w-full" />
                      <div className="h-3 bg-muted w-1/2" />
                    </div>
                    <div className="h-4 bg-muted w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center pt-24"
            >
              <SlidersHorizontal className="w-12 h-12 text-muted-foreground/30 mb-6" />
              <h3 className="font-serif text-3xl mb-4">No results found</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                We could not find any pieces matching your current filters. Try adjusting your search, category, or
                price range.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-8 px-8 py-3 border border-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProducts.map((product, index) => (
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
