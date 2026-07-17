"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * Sale-specific hero — same parallax/reveal language as the homepage
 * HeroSection, sized for an inner listing page rather than a full-bleed
 * landing moment. Stats are derived from the real on-sale catalog, never
 * hardcoded, so the headline can't drift out of sync with actual inventory.
 */
export function SaleHero({ productCount, maxDiscount, scrollTargetId }) {
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
      className="relative w-full h-[70vh] min-h-[520px] bg-ink flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full origin-bottom">
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(236,72,153,0.35) 0%, rgba(245,158,11,0.22) 100%), linear-gradient(to bottom, rgba(11,17,32,0.55), rgba(11,17,32,0.4), rgba(11,17,32,0.85))",
          }}
        />
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400&auto=format&fit=crop"
          alt="Sale edit"
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
          <div className="w-10 h-[1px] bg-destructive/70" />
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-destructive font-medium">
            Limited-Time Edit
          </span>
          <div className="w-10 h-[1px] bg-destructive/70" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-serif tracking-tighter text-white drop-shadow-2xl"
        >
          The Sale <span className="italic text-white/85 font-light">Edit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm md:text-base text-white/70 tracking-wide max-w-md"
        >
          {productCount} pieces marked down — up to {maxDiscount}% off, while stock lasts.
        </motion.p>

        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-12 flex items-center gap-3 px-8 py-4 bg-rose text-rose-foreground text-xs font-semibold tracking-[0.2em] uppercase rounded-full transition-all hover:scale-105 hover:bg-rose-hover active:scale-95 shadow-glow-rose"
        >
          Shop the Sale
          <span className="w-8 h-8 rounded-full bg-rose-foreground text-rose flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
            <ArrowDown size={14} strokeWidth={1.5} />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
