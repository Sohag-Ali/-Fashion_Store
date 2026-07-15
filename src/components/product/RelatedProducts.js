"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/products/${product.id}`} className="group flex flex-col">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start px-0.5">
                <div className="flex flex-col">
                  <h3 className="font-serif text-base md:text-lg tracking-tight group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] mt-1.5">
                    {product.category}
                  </p>
                </div>
                <p className="font-medium text-sm tabular-nums tracking-wider">{product.priceFormatted}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
