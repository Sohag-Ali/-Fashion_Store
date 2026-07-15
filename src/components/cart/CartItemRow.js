"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { formatPrice } from "@/lib/utils";

export function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5 sm:gap-8 py-8 border-b border-foreground/10"
    >
      <Link href={`/products/${item.id}`} className="shrink-0 w-24 sm:w-32 aspect-[3/4] bg-muted overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </Link>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <Link href={`/products/${item.id}`} className="font-serif text-lg sm:text-xl tracking-tight hover:text-muted-foreground transition-colors">
              {item.title}
            </Link>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mt-2">
              {item.category}
            </p>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-3">
              {item.color && <span>Color: {item.color}</span>}
              {item.size && <span>Size: {item.size}</span>}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.key)}
            aria-label={`Remove ${item.title} from cart`}
            className="p-2 -mr-2 -mt-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex items-end justify-between gap-4">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(quantity) => onUpdateQuantity(item.key, quantity)}
            max={item.stock}
            showLabel={false}
            size="compact"
          />
          <p className="font-medium text-sm sm:text-base tabular-nums tracking-wide">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
