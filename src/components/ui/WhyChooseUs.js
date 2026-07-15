"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Scissors, Globe, Award } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Scissors size={24} strokeWidth={1.5} />,
      title: "Master Craftsmanship",
      description: "Every stitch is meticulously placed by artisans who have honed their skills over generations."
    },
    {
      icon: <Leaf size={24} strokeWidth={1.5} />,
      title: "Sustainable Materials",
      description: "We source only the finest, ethically produced materials with minimal environmental impact."
    },
    {
      icon: <Globe size={24} strokeWidth={1.5} />,
      title: "Global Heritage",
      description: "Drawing inspiration from international design capitals while maintaining our distinctive roots."
    },
    {
      icon: <Award size={24} strokeWidth={1.5} />,
      title: "Uncompromising Quality",
      description: "Rigorous quality control ensures each piece meets our exacting standards before it reaches you."
    }
  ];

  return (
    <section className="w-full bg-background border-t border-b border-foreground/5 py-[clamp(6rem,12vw,10rem)]">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-20 md:mb-32 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 block"
          >
            Our Philosophy
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-serif tracking-tighter leading-tight text-balance"
          >
            Redefining Luxury Through Purpose and Precision
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center mb-8 group-hover:border-foreground transition-colors duration-500 bg-background text-foreground group-hover:bg-foreground group-hover:text-background">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif tracking-tight mb-4">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-xs">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
