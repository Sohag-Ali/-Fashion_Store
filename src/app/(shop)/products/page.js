"use client";

import React, { Suspense, useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { productsData, categoriesList } from "@/lib/dummyData";
import { ProductCard } from "@/components/product/ProductCard";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ?? "All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [isLoading, setIsLoading] = useState(true);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsData];

    // Search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sorting
    switch (sortOrder) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortOrder]);

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
            The Collection
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

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-16 border-t border-b border-foreground/10 py-6 sticky top-[80px] bg-background/80 backdrop-blur-xl z-40"
        >
          {/* Categories */}
          <div className="flex overflow-x-auto w-full xl:w-auto pb-4 xl:pb-0 gap-6 hide-scrollbar">
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category 
                    ? "text-foreground font-semibold border-b border-foreground pb-1" 
                    : "text-muted-foreground hover:text-foreground pb-1"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
            {/* Search */}
            <div className="relative group w-full sm:w-64">
              <label htmlFor="product-search" className="sr-only">Search products</label>
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input
                id="product-search"
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-foreground/20 py-2 pl-8 pr-4 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto group">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-transparent border border-foreground/20 px-6 py-2.5 pr-12 text-xs uppercase tracking-widest cursor-pointer focus:outline-none focus:border-foreground transition-colors hover:border-foreground/50 rounded-none"
              >
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </motion.div>

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
                We could not find any pieces matching your current filters. Try adjusting your search or category selection.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("All");
                }}
                className="mt-8 px-8 py-3 border border-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]"
            >
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
