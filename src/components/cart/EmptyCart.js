"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-24 sm:py-32"
    >
      <div className="w-20 h-20 rounded-full border border-foreground/10 flex items-center justify-center mb-8">
        <ShoppingBag size={28} strokeWidth={1.25} className="text-muted-foreground" />
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-4">Your bag is empty</h2>
      <p className="text-sm text-muted-foreground max-w-sm mb-10 leading-relaxed">
        Pieces you add to your bag will appear here. Explore the collection to find something you love.
      </p>
      <Link
        href="/products"
        className="px-8 py-3 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}
