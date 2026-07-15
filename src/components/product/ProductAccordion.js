"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductAccordion({ items, defaultOpen }) {
  const [openId, setOpenId] = useState(defaultOpen ?? null);

  return (
    <div className="border-t border-foreground/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-foreground/10">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="flex items-center gap-3 text-sm uppercase tracking-[0.12em] font-medium">
                {item.icon}
                {item.title}
              </span>
              <Plus
                size={16}
                strokeWidth={1.5}
                className={cn(
                  "text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-45 text-foreground"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm text-muted-foreground leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
