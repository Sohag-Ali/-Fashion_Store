"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductGrid({ title, subtitle, products = [], linkText = "View All", linkHref = "#" }) {
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
          <a 
            href={linkHref} 
            className="group flex items-center gap-4 text-xs font-medium tracking-[0.15em] uppercase pb-2 border-b border-foreground/20 hover:border-foreground transition-colors duration-500"
          >
            {linkText}
            <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">→</span>
          </a>
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

function ProductCard({ product, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      <Link href={`/products/${product.id}`} className="cursor-pointer flex flex-col">
        <div className="aspect-[3/4] bg-muted relative overflow-hidden mb-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick Add Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <button
              onClick={(e) => e.preventDefault()}
              className="px-8 py-3 bg-white text-black text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-black hover:text-white transition-colors duration-300 shadow-xl"
            >
              Quick Add
            </button>
          </div>
        </div>

        <div className="flex justify-between items-start pt-2 px-1">
          <div className="flex flex-col">
            <h3 className="font-serif text-xl tracking-tight group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-2">
              {product.category}
            </p>
          </div>
          <p className="font-medium text-sm tabular-nums tracking-wider">{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
