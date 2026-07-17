"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared editorial tile for every collection-style grouping on the
 * Collections page (featured collections, seasons, lifestyle edits).
 * Same visual language as the homepage's category grid, parametrized so it
 * can be reused at any size/aspect ratio.
 */
export function CollectionCard({ href, title, subtitle, image, index = 0, className, sizes }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative group overflow-hidden bg-muted", className)}
    >
      <Link href={href} className="absolute inset-0">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
            className="object-cover transition-transform duration-[2s] group-hover:scale-110 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

        <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
          {subtitle && (
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/70 mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-700 ease-out">
              {subtitle}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            {title}
          </h3>
          <div className="mt-4 flex items-center gap-3 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium border-b border-white pb-1">
              Shop Now
            </span>
            <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
