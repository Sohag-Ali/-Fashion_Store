import { productsData } from "@/data/products";

const reviewAuthors = [
  { name: "Eleanor Vance", verified: true },
  { name: "Margaux Dupont", verified: true },
  { name: "Isabelle Cho", verified: false },
  { name: "Julian Reyes", verified: true },
  { name: "Priya Nair", verified: true },
  { name: "Hana Ito", verified: false },
];

const reviewTemplates = [
  {
    rating: 5,
    title: "Exceeded expectations",
    comment:
      "The quality is immediately obvious the moment you unwrap it. Every seam and finish feels considered — this is the kind of piece you build a wardrobe around.",
  },
  {
    rating: 5,
    title: "Worth every penny",
    comment:
      "I hesitated on the price for a while, but after wearing it for a month I understand exactly why it costs what it does. True investment piece.",
  },
  {
    rating: 4,
    title: "Beautiful, runs slightly large",
    comment:
      "Gorgeous craftsmanship and the color is even richer in person. I'd size down if you're between sizes — otherwise a flawless addition.",
  },
  {
    rating: 5,
    title: "Compliments every time I wear it",
    comment:
      "I've had three separate strangers ask where this is from. The construction feels like it will genuinely last for years, not seasons.",
  },
  {
    rating: 4,
    title: "Lovely, delivery took a while",
    comment:
      "The product itself is fantastic — soft, well finished, exactly as pictured. Shipping took a little longer than expected but it was worth the wait.",
  },
  {
    rating: 3,
    title: "Nice but not quite what I pictured",
    comment:
      "Good quality overall, though the color skewed slightly warmer than shown on screen. Still keeping it, just wanted to flag it for others.",
  },
];

function buildReviews(productId, seed) {
  return reviewTemplates.map((template, index) => {
    const author = reviewAuthors[(seed + index) % reviewAuthors.length];
    const daysAgo = 6 + seed * 5 + index * 11;
    const date = new Date(Date.UTC(2026, 6, 16));
    date.setUTCDate(date.getUTCDate() - daysAgo);
    return {
      id: `${productId}-r${index + 1}`,
      author: author.name,
      verified: author.verified,
      rating: template.rating,
      title: template.title,
      comment: template.comment,
      date: date.toISOString(),
    };
  });
}

const reviewsData = productsData.reduce((acc, product, index) => {
  acc[product.id] = buildReviews(product.id, index);
  return acc;
}, {});

export function getReviewsForProduct(id) {
  return reviewsData[id] ?? [];
}
