"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function goTo(index) {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function next() {
    goTo((activeIndex + 1) % images.length);
  }

  function prev() {
    goTo((activeIndex - 1 + images.length) % images.length);
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 lg:sticky lg:top-28 lg:self-start">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible hide-scrollbar">
        {images.map((image, index) => (
          <button
            key={image + index}
            onClick={() => goTo(index)}
            aria-label={`View image ${index + 1}`}
            className={cn(
              "relative shrink-0 w-16 h-20 lg:w-20 lg:h-24 overflow-hidden border transition-colors duration-300",
              activeIndex === index
                ? "border-foreground"
                : "border-foreground/10 hover:border-foreground/40"
            )}
          >
            <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            {activeIndex === index && (
              <motion.div
                layoutId="galleryActiveThumb"
                className="absolute inset-0 ring-1 ring-inset ring-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-[4/5] bg-muted overflow-hidden group">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} — view ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-background/70 backdrop-blur-sm text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn size={12} strokeWidth={1.5} />
          Hover to zoom
        </div>

        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to image ${index + 1}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                activeIndex === index ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
