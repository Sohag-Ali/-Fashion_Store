/**
 * Backend-ready query layer over the product catalog. All product/category
 * access — home page, shop page, nav, product detail — should go through
 * these functions rather than importing src/data/products.js directly, so
 * swapping the static array for a real API later only touches this file.
 */

import { productsData } from "@/data/products";
import { categories } from "@/data/categories";

export const SORT_OPTIONS = {
  NEWEST: "newest",
  POPULAR: "popular",
  RATING: "rating",
  PRICE_LOW: "price-low",
  PRICE_HIGH: "price-high",
};

export const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: "Newest",
  [SORT_OPTIONS.POPULAR]: "Popular",
  [SORT_OPTIONS.RATING]: "Best Rating",
  [SORT_OPTIONS.PRICE_LOW]: "Price: Low to High",
  [SORT_OPTIONS.PRICE_HIGH]: "Price: High to Low",
};

// ---------- Catalog access ----------

export function getAllProducts() {
  return productsData;
}

export function getProductById(id) {
  return productsData.find((product) => product.id === id) ?? null;
}

export function getProductBySlug(slug) {
  return productsData.find((product) => product.slug === slug) ?? null;
}

// ---------- Categories & taxonomy ----------

/** Every top-level category, annotated with a live product count. */
export function getCategories() {
  return categories.map((category) => ({
    ...category,
    productCount: productsData.filter((product) => product.category === category.slug).length,
  }));
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug) ?? null;
}

/** Subcategories for one parent category, each annotated with a live product count. */
export function getSubCategories(categorySlug) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return category.subCategories.map((sub) => ({
    ...sub,
    productCount: productsData.filter(
      (product) => product.category === categorySlug && product.subCategory === sub.slug
    ).length,
  }));
}

export function getBrands() {
  return [...new Set(productsData.map((product) => product.brand))].sort();
}

// ---------- Curated slices ----------

export function getFeaturedProducts(count) {
  const list = productsData.filter((product) => product.featured);
  return typeof count === "number" ? list.slice(0, count) : list;
}

export function getNewArrivals(count) {
  const list = [...productsData]
    .filter((product) => product.newArrival)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return typeof count === "number" ? list.slice(0, count) : list;
}

export function getBestSellers(count) {
  const list = [...productsData]
    .filter((product) => product.bestSeller)
    .sort((a, b) => b.reviewCount - a.reviewCount);
  return typeof count === "number" ? list.slice(0, count) : list;
}

export function getOnSaleProducts(count) {
  const list = productsData.filter((product) => product.discount > 0);
  return typeof count === "number" ? list.slice(0, count) : list;
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === "all") return productsData;
  return productsData.filter((product) => product.category === categorySlug);
}

export function getProductsBySubCategory(categorySlug, subCategorySlug) {
  return productsData.filter(
    (product) => product.category === categorySlug && product.subCategory === subCategorySlug
  );
}

export function getRelatedProducts(product, count = 4) {
  if (!product) return [];
  const sameSubCategory = productsData.filter(
    (item) => item.subCategory === product.subCategory && item.id !== product.id
  );
  const sameCategory = productsData.filter(
    (item) =>
      item.category === product.category &&
      item.subCategory !== product.subCategory &&
      item.id !== product.id
  );
  const rest = productsData.filter(
    (item) => item.category !== product.category && item.id !== product.id
  );
  return [...sameSubCategory, ...sameCategory, ...rest].slice(0, count);
}

// ---------- Pricing ----------

/** Price after the product's discount percentage is applied, rounded to the nearest dollar. */
export function getFinalPrice(product) {
  if (!product?.discount) return product?.price ?? 0;
  return Math.round(product.price * (1 - product.discount / 100));
}

export function getPriceBounds(list = productsData) {
  if (list.length === 0) return { min: 0, max: 0 };
  const prices = list.map(getFinalPrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// ---------- Search, filter, sort ----------

export function searchProducts(query, list = productsData) {
  const q = query?.trim().toLowerCase();
  if (!q) return list;
  return list.filter((product) =>
    [product.name, product.brand, product.category, product.subCategory, product.collection, product.description]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q))
  );
}

/**
 * Apply category/subCategory/price filters to a product list.
 * `category`/`subCategory` of "all" (or omitted) are treated as no-ops.
 */
export function filterProducts(list, { category, subCategory, minPrice, maxPrice, gender } = {}) {
  return list.filter((product) => {
    if (category && category !== "all" && product.category !== category) return false;
    if (subCategory && subCategory !== "all" && product.subCategory !== subCategory) return false;
    if (gender && gender !== "all" && product.gender !== gender && product.gender !== "unisex") return false;

    const finalPrice = getFinalPrice(product);
    if (typeof minPrice === "number" && finalPrice < minPrice) return false;
    if (typeof maxPrice === "number" && finalPrice > maxPrice) return false;
    return true;
  });
}

export function sortProducts(list, sortKey) {
  const sorted = [...list];
  switch (sortKey) {
    case SORT_OPTIONS.POPULAR:
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case SORT_OPTIONS.RATING:
      return sorted.sort((a, b) => b.rating - a.rating);
    case SORT_OPTIONS.PRICE_LOW:
      return sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    case SORT_OPTIONS.PRICE_HIGH:
      return sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    case SORT_OPTIONS.NEWEST:
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}
