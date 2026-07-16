"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getCategories } from "@/lib/products";

// Bento-style column spans, cycled across however many categories exist —
// keeps the asymmetric layout even as the taxonomy grows or shrinks.
const COL_SPANS = ["md:col-span-8", "md:col-span-4", "md:col-span-5", "md:col-span-7"];

export default function Categories() {
  const categories = getCategories();

  return (
    <section className="w-full px-4 md:px-6 py-[clamp(4rem,10vw,8rem)] max-w-[1800px] mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Shop by Category
        </span>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif tracking-tighter">
          The Collection
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[400px] md:auto-rows-[550px]">
        {categories.map((category, index) => (
          <CategoryBlock
            key={category.id}
            category={category}
            colSpan={COL_SPANS[index % COL_SPANS.length]}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryBlock({ category, colSpan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group overflow-hidden ${colSpan} bg-neutral-100 dark:bg-neutral-900`}
    >
      <Link href={`/products?category=${category.slug}`} className="absolute inset-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[2s] group-hover:scale-110 ease-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {category.productCount} {category.productCount === 1 ? "Piece" : "Pieces"}
          </span>
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {category.name}
          </h3>
          <div className="mt-6 flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out">
            <span className="text-xs uppercase tracking-[0.2em] font-medium border-b border-white pb-1">
              Shop Now
            </span>
            <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
