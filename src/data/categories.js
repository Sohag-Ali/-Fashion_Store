/**
 * Single source of truth for the site's product taxonomy.
 * Parent categories are never mixed with subcategories — every product's
 * `category` field must reference a `slug` here, and its `subCategory`
 * field must reference a `subCategories[].slug` scoped to that category.
 */

export const categories = [
  {
    id: "men",
    slug: "men",
    name: "Men",
    description: "Tailored essentials and considered staples for the modern wardrobe.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1600&auto=format&fit=crop",
    subCategories: [
      { id: "t-shirts", slug: "t-shirts", name: "T-Shirts" },
      { id: "shirts", slug: "shirts", name: "Shirts" },
      { id: "polos", slug: "polos", name: "Polos" },
      { id: "hoodies", slug: "hoodies", name: "Hoodies" },
      { id: "sweaters", slug: "sweaters", name: "Sweaters" },
      { id: "jackets", slug: "jackets", name: "Jackets" },
      { id: "jeans", slug: "jeans", name: "Jeans" },
      { id: "pants", slug: "pants", name: "Pants" },
    ],
  },
  {
    id: "women",
    slug: "women",
    name: "Women",
    description: "Fluid silhouettes and refined tailoring across every season.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
    subCategories: [
      { id: "dresses", slug: "dresses", name: "Dresses" },
      { id: "tops", slug: "tops", name: "Tops" },
      { id: "blouses", slug: "blouses", name: "Blouses" },
      { id: "skirts", slug: "skirts", name: "Skirts" },
      { id: "jeans", slug: "jeans", name: "Jeans" },
      { id: "jackets", slug: "jackets", name: "Jackets" },
      { id: "coats", slug: "coats", name: "Coats" },
    ],
  },
  {
    id: "shoes",
    slug: "shoes",
    name: "Shoes",
    description: "Handcrafted footwear built on quality leather and considered soles.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop",
    subCategories: [
      { id: "sneakers", slug: "sneakers", name: "Sneakers" },
      { id: "boots", slug: "boots", name: "Boots" },
      { id: "running", slug: "running", name: "Running" },
      { id: "sandals", slug: "sandals", name: "Sandals" },
      { id: "formal", slug: "formal", name: "Formal" },
    ],
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    description: "The finishing details — bags, jewelry, and leather goods.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1600&auto=format&fit=crop",
    subCategories: [
      { id: "bags", slug: "bags", name: "Bags" },
      { id: "watches", slug: "watches", name: "Watches" },
      { id: "jewelry", slug: "jewelry", name: "Jewelry" },
      { id: "sunglasses", slug: "sunglasses", name: "Sunglasses" },
      { id: "belts", slug: "belts", name: "Belts" },
      { id: "caps", slug: "caps", name: "Caps" },
      { id: "wallets", slug: "wallets", name: "Wallets" },
    ],
  },
];
