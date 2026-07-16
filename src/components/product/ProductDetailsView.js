"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Ruler, ShoppingBag, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { StarRating } from "@/components/ui/StarRating";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ColorSelector } from "@/components/product/ColorSelector";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductAccordion } from "@/components/product/ProductAccordion";
import { ShippingInfo } from "@/components/product/ShippingInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getCategoryBySlug, getFinalPrice } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function ProductDetailsView({ product, relatedProducts, reviews }) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [addState, setAddState] = useState("idle"); // idle | adding | added

  const wishlisted = isWishlisted(product.id);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const category = getCategoryBySlug(product.category);
  const finalPrice = getFinalPrice(product);
  const hasDiscount = product.discount > 0;

  function handleAddToCart() {
    if (!selectedSize) {
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 1600);
      return;
    }
    setAddState("adding");
    setTimeout(() => {
      addItem(product, { size: selectedSize, color: selectedColor, quantity });
      setAddState("added");
    }, 500);
    setTimeout(() => setAddState("idle"), 2400);
  }

  const detailLines = [
    `${product.brand} — ${product.collection} collection, ${product.season}`,
    `Available in ${product.colors.length} ${product.colors.length === 1 ? "color" : "colors"}: ${product.colors
      .map((color) => color.name)
      .join(", ")}`,
    "Dry clean or hand wash cold, depending on fabric",
    `SKU ${product.sku}`,
  ];

  const accordionItems = [
    {
      id: "details",
      title: "Details & Care",
      icon: <Sparkles size={15} strokeWidth={1.5} />,
      content: (
        <ul className="flex flex-col gap-2">
          {detailLines.map((detail) => (
            <li key={detail} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      icon: <Ruler size={15} strokeWidth={1.5} />,
      content: <ShippingInfo />,
    },
  ];

  return (
    <main className="flex-1 w-full bg-background pt-28 md:pt-32 pb-24 selection:bg-primary selection:text-primary-foreground">
      <Container>
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-10"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">
            {category?.name ?? product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-[clamp(5rem,10vw,8rem)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductGallery images={product.gallery} title={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col max-w-xl"
          >
            {product.newArrival && (
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                New Arrival
              </span>
            )}
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{product.brand}</span>
            <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-serif tracking-tighter leading-[1.05] mb-4 text-balance">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} size={15} />
              <a href="#reviews" className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">
                {product.reviewCount} reviews
              </a>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <p className="text-2xl font-medium tabular-nums tracking-wide">{formatPrice(finalPrice)}</p>
              {hasDiscount && (
                <>
                  <p className="text-base text-muted-foreground line-through tabular-nums">
                    {formatPrice(product.price)}
                  </p>
                  <span className="text-xs uppercase tracking-widest font-medium text-background bg-foreground px-2 py-1">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col gap-8 mb-10">
              <ColorSelector colors={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={(size) => {
                  setSelectedSize(size);
                  setShowSizeWarning(false);
                }}
              />
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={Math.min(10, product.stock)} />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                animate={showSizeWarning ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                transition={showSizeWarning ? { duration: 0.5 } : { duration: 0.15 }}
                className="relative flex-1 h-14 flex items-center justify-center gap-3 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.15em] overflow-hidden disabled:opacity-60"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {addState === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <ShoppingBag size={16} strokeWidth={1.5} />
                      Add to Cart
                    </motion.span>
                  )}
                  {addState === "adding" && (
                    <motion.span
                      key="adding"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                        className="w-3.5 h-3.5 border-2 border-background/40 border-t-background rounded-full"
                      />
                      Adding
                    </motion.span>
                  )}
                  {addState === "added" && (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <Check size={16} strokeWidth={2} />
                      Added to Bag
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                onClick={() => toggleItem(product)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className="w-14 h-14 shrink-0 flex items-center justify-center border border-foreground/20 hover:border-foreground transition-colors duration-300"
              >
                <motion.span animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.35 }}>
                  <Heart
                    size={18}
                    strokeWidth={1.5}
                    className={wishlisted ? "fill-foreground text-foreground" : "text-foreground"}
                  />
                </motion.span>
              </button>
            </div>

            <AnimatePresence>
              {showSizeWarning && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-destructive mb-4"
                >
                  Please select a size before adding to cart.
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-10">
              SKU {product.sku} &middot; {product.stock > 5 ? "In Stock" : `Only ${product.stock} left`}
            </p>

            <ProductAccordion items={accordionItems} defaultOpen="details" />
          </motion.div>
        </div>

        {/* Reviews */}
        <motion.section
          id="reviews"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-28 pt-16 border-t border-foreground/10 mb-[clamp(5rem,10vw,8rem)]"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
            Customer Voices
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-none font-serif tracking-tighter mb-12">
            Reviews
          </h2>
          <ProductReviews rating={product.rating} reviewCount={product.reviewCount} reviews={reviews} />
        </motion.section>

        {/* Related products */}
        <RelatedProducts products={relatedProducts} />
      </Container>
    </main>
  );
}
