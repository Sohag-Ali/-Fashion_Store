"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="w-full bg-neutral-100 dark:bg-neutral-900 py-[clamp(6rem,12vw,10rem)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 block">
            Client Voices
          </span>
          <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-serif tracking-tight leading-snug md:leading-normal text-balance mx-auto text-foreground mb-12">
            "An absolute revelation. The attention to detail and the sheer quality of the materials speak of a brand that truly understands the essence of modern luxury."
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium tracking-widest uppercase">Eleanor Vance</span>
            <span className="text-xs text-muted-foreground font-light italic">Creative Director, Vogue</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
