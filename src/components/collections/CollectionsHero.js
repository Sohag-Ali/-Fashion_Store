"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * Premium landing moment for the Collections page — same parallax/reveal
 * language as the homepage HeroSection, with a stat line computed live from
 * the catalog rather than a hardcoded claim.
 */
export function CollectionsHero({ collectionCount, productCount, scrollTargetId }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  function handleScrollDown(e) {
    e.preventDefault();
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[600px] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full origin-bottom">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/85 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2400&auto=format&fit=crop"
          alt="The Collections"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-10 h-[1px] bg-white/50" />
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/80 font-medium">
            Fall / Winter 2026
          </span>
          <div className="w-10 h-[1px] bg-white/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-serif tracking-tighter text-white drop-shadow-2xl"
        >
          The <span className="italic text-white/85 font-light">Collections</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm md:text-base text-white/70 tracking-wide max-w-md"
        >
          {productCount} pieces across {collectionCount} curated collections — tailoring, seasonal edits, and
          lifestyle essentials.
        </motion.p>

        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-12 flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.25)]"
        >
          Explore
          <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
            <ArrowDown size={14} strokeWidth={1.5} />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
