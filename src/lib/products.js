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
  DISCOUNT: "discount-high",
};

export const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: "Newest",
  [SORT_OPTIONS.POPULAR]: "Popular",
  [SORT_OPTIONS.RATING]: "Best Rating",
  [SORT_OPTIONS.PRICE_LOW]: "Price: Low to High",
  [SORT_OPTIONS.PRICE_HIGH]: "Price: High to Low",
  [SORT_OPTIONS.DISCOUNT]: "Biggest Savings",
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

// ---------- Collections (derived — nothing below is a hardcoded name) ----------

/** Most-recently-added product's image, used as a group's cover photo. */
function coverImage(products) {
  return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.image;
}

/**
 * Every distinct value of `product.collection` in the catalog, with a live
 * count, cover image, and starting price — entirely derived from data, so a
 * new collection added to src/data/products.js appears here automatically.
 */
export function getCollections() {
  const groups = new Map();
  productsData.forEach((product) => {
    if (!product.collection) return;
    if (!groups.has(product.collection)) groups.set(product.collection, []);
    groups.get(product.collection).push(product);
  });

  return [...groups.entries()]
    .map(([name, products]) => ({
      name,
      slug: encodeURIComponent(name),
      href: `/products?collection=${encodeURIComponent(name)}`,
      productCount: products.length,
      featuredCount: products.filter((product) => product.featured).length,
      priceFrom: Math.min(...products.map(getFinalPrice)),
      image: coverImage(products),
    }))
    .sort((a, b) => b.productCount - a.productCount);
}

export function getCollectionByName(name) {
  return getCollections().find((collection) => collection.name === name) ?? null;
}

/** Top collections by curated weight (how many featured pieces they carry), breadth as tiebreak. */
export function getFeaturedCollections(count) {
  const list = getCollections().sort(
    (a, b) => b.featuredCount - a.featuredCount || b.productCount - a.productCount
  );
  return typeof count === "number" ? list.slice(0, count) : list;
}

/** Every distinct value of `product.season`, derived the same way as getCollections(). */
export function getSeasons() {
  const groups = new Map();
  productsData.forEach((product) => {
    if (!product.season) return;
    if (!groups.has(product.season)) groups.set(product.season, []);
    groups.get(product.season).push(product);
  });

  return [...groups.entries()]
    .map(([name, products]) => ({
      name,
      href: `/products?season=${encodeURIComponent(name)}`,
      productCount: products.length,
      image: coverImage(products),
    }))
    .sort((a, b) => b.productCount - a.productCount);
}

// `gender` is a closed schema enum (men/women/unisex), not open-ended
// business data, so labeling it here isn't "hardcoding a collection" — it's
// the same kind of small display mapping as SORT_LABELS above.
const LIFESTYLE_LABELS = {
  men: "The Men's Edit",
  women: "The Women's Edit",
  unisex: "The Unisex Edit",
};

/** Audience-based edits derived from `product.gender`. */
export function getLifestyleEdits() {
  const groups = new Map();
  productsData.forEach((product) => {
    if (!product.gender) return;
    if (!groups.has(product.gender)) groups.set(product.gender, []);
    groups.get(product.gender).push(product);
  });

  return [...groups.entries()]
    .map(([gender, products]) => ({
      gender,
      label: LIFESTYLE_LABELS[gender] ?? `The ${gender} Edit`,
      href: `/products?gender=${encodeURIComponent(gender)}`,
      productCount: products.length,
      image: coverImage(products),
    }))
    .sort((a, b) => b.productCount - a.productCount);
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
 * Apply category/subCategory/collection/season/price filters to a product
 * list. `category`/`subCategory` of "all" (or omitted) are treated as no-ops.
 */
export function filterProducts(
  list,
  { category, subCategory, minPrice, maxPrice, gender, collection, season } = {}
) {
  return list.filter((product) => {
    if (category && category !== "all" && product.category !== category) return false;
    if (subCategory && subCategory !== "all" && product.subCategory !== subCategory) return false;
    if (gender && gender !== "all" && product.gender !== gender && product.gender !== "unisex") return false;
    if (collection && product.collection !== collection) return false;
    if (season && product.season !== season) return false;

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
    case SORT_OPTIONS.DISCOUNT:
      return sorted.sort((a, b) => b.discount - a.discount);
    case SORT_OPTIONS.NEWEST:
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}
