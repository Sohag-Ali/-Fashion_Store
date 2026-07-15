"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "luxe-wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted wishlist after mount to avoid SSR/client hydration mismatch
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

  function toWishlistEntry(product) {
    return {
      id: product.id,
      title: product.title,
      category: product.category,
      image: product.image,
      price: product.price,
      priceFormatted: product.priceFormatted,
    };
  }

  function addItem(product) {
    setItems((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, toWishlistEntry(product)]
    );
  }

  function removeItem(productId) {
    setItems((current) => current.filter((item) => item.id !== productId));
  }

  function toggleItem(product) {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, toWishlistEntry(product)]
    );
  }

  function isWishlisted(productId) {
    return items.some((item) => item.id === productId);
  }

  function clearWishlist() {
    setItems([]);
  }

  const itemCount = useMemo(() => items.length, [items]);

  const value = {
    items,
    isHydrated,
    itemCount,
    addItem,
    removeItem,
    toggleItem,
    isWishlisted,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
