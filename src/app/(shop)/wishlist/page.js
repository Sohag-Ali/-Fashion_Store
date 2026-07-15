"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useWishlist } from "@/context/WishlistProvider";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const { items, isHydrated, itemCount } = useWishlist();

  return (
    <main className="flex-1 w-full bg-background min-h-screen pt-28 md:pt-32 pb-24 selection:bg-primary selection:text-primary-foreground">
      <Container>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-10"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Wishlist</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12 gap-6"
        >
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-serif tracking-tighter">
            Wishlist
          </h1>
          {isHydrated && itemCount > 0 && (
            <p className="text-xs text-muted-foreground uppercase tracking-widest pb-1">
              {itemCount} {itemCount === 1 ? "piece" : "pieces"}
            </p>
          )}
        </motion.div>

        {!isHydrated ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)] animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col">
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
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-24 sm:py-32"
          >
            <div className="w-20 h-20 rounded-full border border-foreground/10 flex items-center justify-center mb-8">
              <Heart size={28} strokeWidth={1.25} className="text-muted-foreground" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-4">Your wishlist is empty</h2>
            <p className="text-sm text-muted-foreground max-w-sm mb-10 leading-relaxed">
              Pieces you save will appear here. Explore the collection to find something you love.
            </p>
            <Link
              href="/products"
              className="px-8 py-3 border border-foreground text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]">
            {items.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} showQuickAdd={false} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
