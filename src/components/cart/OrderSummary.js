"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Tag, X, ArrowRight, Loader2 } from "lucide-react";
import { getCoupon } from "@/lib/coupons";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 200;
const FLAT_SHIPPING_RATE = 15;

export function OrderSummary({ subtotal, itemCount, onCheckoutSuccess }) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [checkoutState, setCheckoutState] = useState("idle"); // idle | processing | success

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  function handleApplyCoupon(e) {
    e.preventDefault();
    const coupon = getCoupon(couponInput);
    if (!coupon) {
      setCouponError("That code isn't valid. Try LUXE10 or WELCOME15.");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError("");
    setCouponInput("");
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponError("");
  }

  function handleCheckout() {
    if (checkoutState !== "idle") return;
    setCheckoutState("processing");
    setTimeout(() => {
      setCheckoutState("success");
      onCheckoutSuccess?.();
    }, 1400);
  }

  return (
    <div className="border border-foreground/10 p-6 sm:p-8 lg:sticky lg:top-28">
      <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-8">Order Summary</h2>

      <div className="flex flex-col gap-4 text-sm mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal &middot; {itemCount} {itemCount === 1 ? "item" : "items"}</span>
          <span className="tabular-nums text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="tabular-nums text-foreground">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>

        <AnimatePresence>
          {appliedCoupon && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between text-muted-foreground overflow-hidden"
            >
              <span className="flex items-center gap-2">
                <Tag size={13} strokeWidth={1.5} />
                {appliedCoupon.code}
                <button
                  onClick={handleRemoveCoupon}
                  aria-label="Remove coupon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={12} strokeWidth={1.5} />
                </button>
              </span>
              <span className="tabular-nums text-foreground">-{formatPrice(discount)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!appliedCoupon && (
        <form onSubmit={handleApplyCoupon} className="mb-6">
          <label htmlFor="coupon-code" className="sr-only">
            Coupon code
          </label>
          <div className="flex items-stretch border border-foreground/20 focus-within:border-primary transition-colors">
            <input
              id="coupon-code"
              type="text"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                if (couponError) setCouponError("");
              }}
              placeholder="Coupon code"
              className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!couponInput.trim()}
              className="px-5 text-xs uppercase tracking-widest font-medium text-foreground hover:bg-secondary/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors shrink-0"
            >
              Apply
            </button>
          </div>
          <AnimatePresence>
            {couponError && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive mt-2"
              >
                {couponError}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      )}

      <div className="flex justify-between items-baseline pt-6 border-t border-foreground/10 mb-8">
        <span className="text-sm font-medium uppercase tracking-widest">Total</span>
        <span className="text-2xl font-medium tabular-nums tracking-wide">{formatPrice(total)}</span>
      </div>

      <motion.button
        onClick={handleCheckout}
        whileTap={{ scale: 0.98 }}
        disabled={checkoutState !== "idle"}
        className="relative w-full h-14 flex items-center justify-center gap-3 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.15em] overflow-hidden hover:bg-primary-hover transition-colors shadow-glow-primary disabled:cursor-default disabled:shadow-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          {checkoutState === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              Checkout
              <ArrowRight size={15} strokeWidth={1.5} />
            </motion.span>
          )}
          {checkoutState === "processing" && (
            <motion.span
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
              Processing
            </motion.span>
          )}
          {checkoutState === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <Check size={16} strokeWidth={2} />
              Order Placed
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
        This is a demo checkout &mdash; no payment is processed and no order is sent anywhere.
      </p>
    </div>
  );
}
