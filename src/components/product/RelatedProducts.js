"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

export function RelatedProducts({ products, title = "You May Also Like" }) {
  if (!products.length) return null;

  return (
    <section className="w-full">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-serif tracking-tighter">{title}</h2>
        <Link
          href="/products"
          className="hidden sm:flex items-center gap-3 text-xs font-medium tracking-[0.15em] uppercase pb-1 border-b border-foreground/20 hover:border-foreground transition-colors duration-500 group"
        >
          View All
          <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(1.5rem,3vw,3rem)]">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} size="compact" showQuickAdd={false} />
        ))}
      </div>
    </section>
  );
}
