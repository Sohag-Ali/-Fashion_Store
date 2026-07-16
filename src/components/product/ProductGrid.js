"use client";

import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductGrid({ title, subtitle, products = [], linkText = "View All", linkHref = "/products" }) {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 py-[clamp(5rem,12vw,10rem)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          {subtitle && (
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {subtitle}
            </span>
          )}
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-serif tracking-tighter text-balance">
            {title}
          </h2>
        </div>
        {linkText && (
          <Link
            href={linkHref}
            className="group flex items-center gap-4 text-xs font-medium tracking-[0.15em] uppercase pb-2 border-b border-foreground/20 hover:border-foreground transition-colors duration-500"
          >
            {linkText}
            <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">→</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(2rem,5vw,4rem)]">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
