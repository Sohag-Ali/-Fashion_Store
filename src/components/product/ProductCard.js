"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { getFinalPrice } from "@/lib/products";
import { StarRating } from "@/components/ui/StarRating";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({ product, size = "default", showQuickAdd = true, index = 0 }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [addState, setAddState] = useState("idle"); // idle | adding | added

  const wishlisted = isWishlisted(product.id);
  const isCompact = size === "compact";
  const isSoldOut = product.stock === 0;
  const finalPrice = getFinalPrice(product);
  const hasDiscount = product.discount > 0;

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (addState !== "idle" || isSoldOut) return;

    const defaultSize = product.sizes?.[0];
    const defaultColor = product.colors?.[0]?.name;

    setAddState("adding");
    setTimeout(() => {
      addItem(product, { size: defaultSize, color: defaultColor, quantity: 1 });
      setAddState("added");
    }, 500);
    setTimeout(() => setAddState("idle"), 2000);
  }

  function handleWishlistToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <Link href={`/products/${product.slug}`} className="cursor-pointer flex flex-col">
        <div className="aspect-[3/4] bg-muted relative overflow-hidden mb-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {(hasDiscount || product.newArrival) && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.newArrival && (
                <span className="px-2.5 py-1 bg-background/90 backdrop-blur-sm text-[10px] uppercase tracking-widest font-medium">
                  New
                </span>
              )}
              {hasDiscount && (
                <span className="px-2.5 py-1 bg-foreground text-background text-[10px] uppercase tracking-widest font-medium">
                  -{product.discount}%
                </span>
              )}
            </div>
          )}

          <button
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 hover:bg-background z-10"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={wishlisted ? "fill-foreground text-foreground" : "text-foreground"}
            />
          </button>

          {showQuickAdd && !isSoldOut && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <button
                onClick={handleQuickAdd}
                className="relative px-8 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-black hover:text-white transition-colors duration-300 shadow-xl min-w-[120px] flex items-center justify-center gap-2"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {addState === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Quick Add
                    </motion.span>
                  )}
                  {addState === "adding" && (
                    <motion.span
                      key="adding"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"
                    />
                  )}
                  {addState === "added" && (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={14} strokeWidth={2} />
                      Added
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-start pt-2 px-1">
          <div className="flex flex-col">
            <h3
              className={cn(
                "font-serif tracking-tight group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors",
                isCompact ? "text-base md:text-lg" : "text-xl"
              )}
            >
              {product.name}
            </h3>
            <p
              className={cn(
                "text-muted-foreground uppercase tracking-[0.15em] mt-2",
                isCompact ? "text-[11px] mt-1.5" : "text-xs"
              )}
            >
              {product.brand}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <StarRating rating={product.rating} size={isCompact ? 11 : 12} />
              <span className="text-[11px] text-muted-foreground tabular-nums">({product.reviewCount})</span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0 pl-3">
            <p className="font-medium text-sm tabular-nums tracking-wider">{formatPrice(finalPrice)}</p>
            {hasDiscount && (
              <p className="text-xs text-muted-foreground line-through tabular-nums">{formatPrice(product.price)}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
