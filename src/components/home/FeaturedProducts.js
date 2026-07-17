"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FeaturedProducts() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="w-full bg-ink text-paper overflow-hidden py-32 relative">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col z-10 relative">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6"
          >
            The Signature Series
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(3rem,6vw,5rem)] font-serif tracking-tighter leading-[1.1] mb-8"
          >
            Masterpiece of <br/> <span className="italic font-light text-white/80">Craftsmanship</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 max-w-md text-lg leading-relaxed font-light mb-12"
          >
            Each piece is meticulously crafted by artisans with decades of experience, ensuring a timeless elegance that transcends seasons.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/products?category=shoes"
              className="inline-flex items-center gap-4 text-xs font-semibold tracking-[0.2em] uppercase pb-3 border-b border-white/30 hover:border-accent hover:text-accent transition-colors duration-500 group w-fit"
            >
              Explore Collection
              <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative h-[600px] lg:h-[800px] w-full">
          <motion.div 
            style={{ y }}
            className="absolute right-0 top-0 w-[80%] h-[90%] bg-white/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
              alt="Featured Footwear"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 bottom-12 lg:bottom-24 w-[50%] h-[40%] bg-ink-hover p-2 shadow-2xl border border-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop"
              alt="Detail Shot"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
