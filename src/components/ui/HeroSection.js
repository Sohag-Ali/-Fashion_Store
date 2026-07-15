"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 w-full h-full origin-bottom"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2400&auto=format&fit=crop"
          alt="Luxury Fashion Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity, y: y2 }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-7xl mx-auto w-full mt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/60" />
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/90 font-medium">
              Fall / Winter 2026
            </span>
            <div className="w-12 h-[1px] bg-white/60" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-serif tracking-tighter text-white font-normal drop-shadow-2xl"
        >
          The Art of <br />
          <span className="italic text-white/90 font-light pr-8">Elegance</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-8"
        >
          <Link
            href="/products"
            className="group relative px-8 py-5 bg-white text-black rounded-full overflow-hidden flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 text-xs font-semibold tracking-[0.2em] uppercase">
              Discover Collection
            </span>
            <div className="relative z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
              <ArrowRight size={18} />
            </div>
            <div className="absolute inset-0 bg-neutral-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Product Cards */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute z-30 bottom-24 right-12 hidden lg:flex flex-col gap-6 perspective-1000"
      >
        <FloatingCard 
          image="https://images.unsplash.com/photo-1591557304169-2fb0d5a3501a?q=80&w=1000&auto=format&fit=crop"
          title="Silk Evening Gown"
          price="$1,290"
          delay={0.8}
        />
        <FloatingCard 
          image="https://images.unsplash.com/photo-1594938298596-73346c1b5948?q=80&w=1160&auto=format&fit=crop"
          title="Leather Tote"
          price="$850"
          delay={1.0}
          offset="-ml-16"
        />
      </motion.div>
      
      {/* Mobile Floating Card */}
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.2, duration: 1 }}
         className="absolute bottom-6 w-full px-6 flex justify-center lg:hidden z-30"
      >
         <FloatingCard 
          image="https://images.unsplash.com/photo-1591557304169-2fb0d5a3501a?q=80&w=1000&auto=format&fit=crop"
          title="Silk Evening Gown"
          price="$1,290"
          delay={1.2}
          fullWidth
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-12 hidden lg:flex flex-col items-center gap-4 z-20"
      >
        <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/60" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

function FloatingCard({ image, title, price, delay, offset = "", fullWidth = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fullWidth ? 0 : 50, y: fullWidth ? 50 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${fullWidth ? 'w-full max-w-sm' : 'w-[280px]'} ${offset}`}
    >
      <Link
        href="/products"
        className={`group flex gap-5 items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl cursor-pointer hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-2`}
      >
        <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 40vw, 220px"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-serif text-base tracking-wide">{title}</span>
          <span className="text-white/60 text-xs font-semibold tracking-[0.1em] mt-1.5 uppercase">{price}</span>
        </div>
        <div className="ml-auto w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mr-2 group-hover:bg-white group-hover:text-black transition-colors duration-300">
           <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
