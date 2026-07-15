"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "Women's Collection",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-8",
      href: "/products",
    },
    {
      id: 2,
      title: "Leather Goods",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
      colSpan: "md:col-span-4",
      href: "/products",
    },
    {
      id: 3,
      title: "Accessories",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-5",
      href: "/products?category=Accessories",
    },
    {
      id: 4,
      title: "Men's Essentials",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
      colSpan: "md:col-span-7",
      href: "/products",
    },
  ];

  return (
    <section className="w-full px-4 md:px-6 py-[clamp(4rem,10vw,8rem)] max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[400px] md:auto-rows-[550px]">
        {categories.map((category, index) => (
          <CategoryBlock key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}

function CategoryBlock({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group overflow-hidden ${category.colSpan} bg-neutral-100 dark:bg-neutral-900`}
    >
      <Link href={category.href} className="absolute inset-0">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[2s] group-hover:scale-110 ease-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {category.title}
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
