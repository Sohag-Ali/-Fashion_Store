/**
 * Single source of truth for the site's navigation IA.
 * Both SiteHeader (desktop) and MobileDrawer render from this config so the
 * two surfaces can never drift out of sync.
 */

import { categories } from "@/data/categories";

export const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products", key: "shop", megaMenu: true },
  { label: "New Arrivals", href: "/products?newArrival=true", key: "new" },
  { label: "Collections", href: "/collections", key: "collections" },
  { label: "Sale", href: "/sale", key: "sale", accent: true },
];

// Generated directly from src/data/categories.js — every column and every
// leaf link resolves to real category/subCategory slugs in the product
// catalog, so nothing here can point at a dead or empty filter.
export const shopMegaMenu = {
  featured: {
    title: "New Season Arrivals",
    subtitle: "Just In",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
    href: "/products?newArrival=true",
    cta: "Shop New Arrivals",
  },
  columns: categories.map((category) => ({
    title: category.name,
    href: `/products?category=${category.slug}`,
    items: category.subCategories.map((sub) => ({
      label: sub.name,
      href: `/products?category=${category.slug}&subCategory=${sub.slug}`,
    })),
  })),
};

export const popularSearches = ["Coats", "Dresses", "Sneakers", "Cashmere", "Bags"];

/**
 * Determines whether a main nav link should render as "active" for the
 * current route + query string. Query-bearing links only match when their
 * specific query params are present, so "Shop" and "New Arrivals" (both
 * under /products) never both light up at once.
 */
export function isNavLinkActive(link, pathname, searchParams) {
  const [linkPath, linkQuery] = link.href.split("?");

  if (pathname !== linkPath) return false;
  if (!linkQuery) {
    // Plain path link (e.g. Shop -> /products): active only when no
    // distinguishing query params from sibling links are present.
    if (linkPath === "/products") {
      return (
        !searchParams.get("newArrival") &&
        !searchParams.get("bestSeller") &&
        !searchParams.get("onSale") &&
        !searchParams.get("category") &&
        !searchParams.get("q")
      );
    }
    return true;
  }

  const linkParams = new URLSearchParams(linkQuery);
  return [...linkParams.entries()].every(([key, value]) => searchParams.get(key) === value);
}
