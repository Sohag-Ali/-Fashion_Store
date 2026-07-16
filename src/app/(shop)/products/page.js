"use client";

import React, { Suspense, useState, useMemo, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
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
import { ProductCardSkeletonGrid } from "@/components/product/ProductCardSkeleton";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Pagination } from "@/components/ui/Pagination";

const PRODUCTS_PER_PAGE = 12;

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
  const [currentPage, setCurrentPage] = useState(() => {
    const parsed = parseInt(searchParams.get("page"), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  });

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

  // Entry-point filters driven by the Collections page — a specific
  // collection, season, or lifestyle (gender) edit. Also stay in effect
  // until explicitly cleared, same as entryFilter above.
  const collectionParam = searchParams.get("collection");
  const seasonParam = searchParams.get("season");
  const genderParam = searchParams.get("gender");
  const activeCollectionLabel =
    collectionParam ?? seasonParam ?? (genderParam ? `${genderParam[0].toUpperCase()}${genderParam.slice(1)}'s Edit` : null);

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
          : activeCollectionLabel
            ? activeCollectionLabel
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

  // Every filter change also resets pagination back to page 1, in the same
  // syncParams call that applies the filter — folding both into one URL
  // replace avoids a race between two independent replace calls each
  // reading a possibly-stale searchParams snapshot.
  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setSelectedSubCategory("all");
    setCurrentPage(1);
    syncParams({ category, subCategory: null, page: null });
  }

  function handleSubCategoryChange(subCategory) {
    setSelectedSubCategory(subCategory);
    setCurrentPage(1);
    syncParams({ subCategory, page: null });
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
    setCurrentPage(1);
    syncParams({ q: value, page: null });
  }

  function handleSortChange(value) {
    setSortKey(value);
    setCurrentPage(1);
    syncParams({ sort: value === SORT_OPTIONS.NEWEST ? null : value, page: null });
  }

  function handlePriceChange(range) {
    setPriceRange(range);
    setCurrentPage(1);
    syncParams({
      minPrice: range.min !== catalogBounds.min ? range.min : null,
      maxPrice: range.max !== catalogBounds.max ? range.max : null,
      page: null,
    });
  }

  function handleClearFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSortKey(SORT_OPTIONS.NEWEST);
    setPriceRange(catalogBounds);
    setCurrentPage(1);
    router.replace(pathname, { scroll: false });
  }

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedSubCategory !== "all" ||
    sortKey !== SORT_OPTIONS.NEWEST ||
    priceRange.min !== catalogBounds.min ||
    priceRange.max !== catalogBounds.max ||
    entryFilter !== null ||
    activeCollectionLabel !== null;

  function handleClearCollectionEntry() {
    syncParams({ collection: null, season: null, gender: null, page: null });
  }

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
      collection: collectionParam,
      season: seasonParam,
      gender: genderParam,
    });

    if (entryFilter === "new") {
      result = result.filter((product) => product.newArrival);
    } else if (entryFilter === "bestsellers") {
      result = result.filter((product) => product.bestSeller);
    } else if (entryFilter === "sale") {
      result = result.filter((product) => product.discount > 0);
    }

    return sortProducts(result, sortKey);
  }, [
    allProducts,
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    priceRange,
    sortKey,
    entryFilter,
    collectionParam,
    seasonParam,
    genderParam,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE));
  // Derived at render time rather than corrected via an effect: if a filter
  // shrinks the result set out from under an out-of-range page, this simply
  // renders the last valid page without an extra render/effect round-trip.
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(
    () =>
      filteredAndSortedProducts.slice(
        (safePage - 1) * PRODUCTS_PER_PAGE,
        safePage * PRODUCTS_PER_PAGE
      ),
    [filteredAndSortedProducts, safePage]
  );

  // entryFilter and the Collections-page params (collection/season/gender)
  // are driven by plain <Link> navigation rather than one of the handlers
  // above, so they're the filter dimensions that need their own reset —
  // skip the first run so a deep link like /products?onSale=true&page=2
  // still lands on the page it points to.
  const skipInitialEntryFilterReset = useRef(true);
  useEffect(() => {
    if (skipInitialEntryFilterReset.current) {
      skipInitialEntryFilterReset.current = false;
      return;
    }
    setCurrentPage(1);
    syncParams({ page: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryFilter, collectionParam, seasonParam, genderParam]);

  function handlePageChange(page) {
    setCurrentPage(page);
    syncParams({ page: page === 1 ? null : String(page) });
  }

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

          {activeCollectionLabel && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={handleClearCollectionEntry}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 text-xs uppercase tracking-widest hover:border-foreground transition-colors duration-300"
            >
              Viewing: {activeCollectionLabel}
              <X size={12} strokeWidth={1.5} />
            </motion.button>
          )}
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
            <ProductCardSkeletonGrid count={6} />
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
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>

              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-[clamp(3rem,6vw,5rem)]"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
