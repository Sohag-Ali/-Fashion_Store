"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "luxe-cart";

function lineKey(productId, size, color) {
  return [productId, size ?? "-", color ?? "-"].join("::");
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted cart after mount to avoid SSR/client hydration mismatch
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  function addItem(product, { size, color, quantity = 1 }) {
    const key = lineKey(product.id, size, color);
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock ?? 99) }
            : item
        );
      }
      return [
        ...current,
        {
          key,
          id: product.id,
          title: product.title,
          category: product.category,
          image: product.image,
          price: product.price,
          priceFormatted: product.priceFormatted,
          stock: product.stock ?? 99,
          size,
          color,
          quantity: Math.min(quantity, product.stock ?? 99),
        },
      ];
    });
  }

  function removeItem(key) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function updateQuantity(key, quantity) {
    setItems((current) =>
      current.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const value = {
    items,
    isHydrated,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
