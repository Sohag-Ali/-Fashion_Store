"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useCart } from "@/context/CartProvider";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart, isHydrated } = useCart();

  return (
    <main className="flex-1 w-full bg-background min-h-screen pt-28 md:pt-32 pb-24 selection:bg-primary selection:text-primary-foreground">
      <Container>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-10"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Shopping Bag</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12 gap-6"
        >
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-serif tracking-tighter">
            Shopping Bag
          </h1>
          {isHydrated && itemCount > 0 && (
            <p className="text-xs text-muted-foreground uppercase tracking-widest pb-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          )}
        </motion.div>

        {!isHydrated ? (
          <div className="flex flex-col gap-8 animate-pulse max-w-2xl">
            {[1, 2].map((n) => (
              <div key={n} className="flex gap-8 pb-8 border-b border-foreground/10">
                <div className="w-32 aspect-[3/4] bg-muted" />
                <div className="flex-1 flex flex-col gap-3 pt-2">
                  <div className="h-5 bg-muted w-2/3" />
                  <div className="h-3 bg-muted w-1/3" />
                  <div className="h-3 bg-muted w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-start">
            <div className="flex flex-col">
              <AnimatePresence initial={false} mode="popLayout">
                {items.map((item) => (
                  <CartItemRow
                    key={item.key}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>

              <button
                onClick={clearCart}
                className="self-start mt-6 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Clear Bag
              </button>
            </div>

            <OrderSummary
              subtotal={subtotal}
              itemCount={itemCount}
              onCheckoutSuccess={() => setTimeout(clearCart, 1400)}
            />
          </div>
        )}
      </Container>
    </main>
  );
}
