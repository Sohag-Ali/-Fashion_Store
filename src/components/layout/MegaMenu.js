"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { shopMegaMenu } from "@/lib/navigation";

/**
 * Full-bleed mega menu panel for the "Shop" nav item.
 * Controlled component: visibility + hover/focus intent is owned by SiteHeader
 * so keyboard and pointer users share one source of truth for open state.
 */
export function MegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave, id, triggerRef }) {
  const panelRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key !== "Escape") return;
    onClose();
    triggerRef?.current?.focus();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          id={id}
          role="region"
          aria-label="Shop categories"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-full border-t border-border/60 bg-background/95 backdrop-blur-xl shadow-luxury"
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-12 grid grid-cols-12 gap-x-8 gap-y-10">
            {/* Category columns */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
              {shopMegaMenu.columns.map((column) => (
                <div key={column.title} className="flex flex-col gap-5">
                  {column.href ? (
                    <Link
                      href={column.href}
                      onClick={onClose}
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground w-fit pb-1 border-b border-transparent hover:border-foreground transition-colors duration-300"
                    >
                      {column.title}
                    </Link>
                  ) : (
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                      {column.title}
                    </h3>
                  )}
                  {column.items.length > 0 && (
                    <ul className="flex flex-col gap-4">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Featured editorial tile */}
            <Link
              href={shopMegaMenu.featured.href}
              onClick={onClose}
              className="col-span-12 lg:col-span-4 group relative overflow-hidden aspect-[16/9] lg:aspect-auto bg-muted"
            >
              <Image
                src={shopMegaMenu.featured.image}
                alt={shopMegaMenu.featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-2">
                  {shopMegaMenu.featured.subtitle}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-4">
                  {shopMegaMenu.featured.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium text-white border-b border-white/60 w-fit pb-1 group-hover:border-white transition-colors duration-300">
                  {shopMegaMenu.featured.cta}
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
